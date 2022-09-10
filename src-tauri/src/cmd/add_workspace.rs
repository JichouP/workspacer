use crate::infrastructure::state::ConfigState;
use std::path::PathBuf;

#[command]
pub fn add_workspace(repository: ConfigState, path: PathBuf) -> Result<Vec<PathBuf>, String> {
    crate::usecase::config::add_workspace(repository.inner(), path).map_err(|e| e.to_string())
}
