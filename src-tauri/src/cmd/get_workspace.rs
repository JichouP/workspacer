use crate::infrastructure::state::ConfigState;
use std::path::PathBuf;

#[command]
pub fn get_workspace(repository: ConfigState) -> Result<Vec<PathBuf>, String> {
    crate::usecase::config::load_workspace(repository.inner()).map_err(|e| e.to_string())
}
