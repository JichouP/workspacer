use super::repository::config::ConfigRepositoryImpl;
use tauri::State;

pub type ConfigState<'a> = State<'a, ConfigRepositoryImpl>;
