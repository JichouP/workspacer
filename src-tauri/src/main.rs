#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

#[macro_use]
extern crate tauri;
#[macro_use]
extern crate serde;

use anyhow::Result;
use infrastructure::repository::config::ConfigRepositoryImpl;
use tauri::Manager;

mod cmd;
mod domain;
mod infrastructure;
mod usecase;

fn main() -> Result<()> {
    tauri::Builder::default()
        .setup(|app| {
            let app_dir = app.path_resolver().app_dir().unwrap();

            let config_repository = ConfigRepositoryImpl::new(app_dir);

            app.manage(config_repository);

            Ok(())
        })
        .invoke_handler(generate_handler![
            cmd::get_stats::get_stats,
            cmd::add_workspace::add_workspace,
            cmd::launch_code::launch_code,
            cmd::remove_workspace::remove_workspace,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    Ok(())
}
