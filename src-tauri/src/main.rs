#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

#[macro_use]
extern crate tauri;

use anyhow::Result;
use tauri::Manager;

mod cmd;

struct AppDir(String);

fn main() -> Result<()> {
    tauri::Builder::default()
        .setup(|app| {
            let app_dir = app
                .path_resolver()
                .app_dir()
                .unwrap()
                .to_string_lossy()
                .to_string();

            let app_dir = AppDir(app_dir);

            app.manage(app_dir);

            Ok(())
        })
        .invoke_handler(generate_handler![cmd::get_stats])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    Ok(())
}
