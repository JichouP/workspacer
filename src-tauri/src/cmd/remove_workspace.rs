use crate::infrastructure::state::ConfigState;
use std::path::PathBuf;

#[command]
pub fn remove_workspace(repository: ConfigState, path: PathBuf) {
    crate::usecase::config::remove_workspace(repository.inner(), path).unwrap();
}
