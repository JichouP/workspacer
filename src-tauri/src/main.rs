#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

#[macro_use]
extern crate tauri;

use anyhow::Result;
use tauri::Manager;

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
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    Ok(())
}
