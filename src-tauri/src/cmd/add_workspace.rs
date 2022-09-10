use crate::infrastructure::state::ConfigState;
use std::path::PathBuf;

#[command]
pub fn add_workspace(repository: ConfigState, path: PathBuf) -> Vec<PathBuf> {
    crate::usecase::config::add_workspace(repository.inner(), path).unwrap()
}
