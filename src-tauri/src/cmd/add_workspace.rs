use crate::infrastructure::state::ConfigState;
use std::path::PathBuf;

#[command]
pub fn add_workspace(repository: ConfigState, workspace: PathBuf) -> Vec<PathBuf> {
    crate::usecase::config::add_workspace(repository.inner(), workspace).unwrap()
}
