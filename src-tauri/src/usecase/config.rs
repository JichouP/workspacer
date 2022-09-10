use crate::domain::config::{Config, ConfigRepository};
use anyhow::Result;
use std::path::PathBuf;

pub fn load(repository: &impl ConfigRepository) -> Result<Config> {
    let result = repository.load();
    match result {
        Ok(_) => result,
        Err(_) => repository.init(),
    }
}

pub fn save(repository: &impl ConfigRepository, config: &Config) -> Result<()> {
    repository.save(config)
}

pub fn load_workspace(repository: &impl ConfigRepository) -> Result<Vec<PathBuf>> {
    let config = match load(repository) {
        Ok(config) => config,
        Err(_) => match save_workspace(repository, vec![]) {
            Ok(_) => load(repository)?,
            Err(e) => return Err(e),
        },
    };

    Ok(config.workspaces)
}

pub fn save_workspace(repository: &impl ConfigRepository, workspaces: Vec<PathBuf>) -> Result<()> {
    save(repository, &Config::new(workspaces))
}

pub fn add_workspace(
    repository: &impl ConfigRepository,
    workspace: PathBuf,
) -> Result<Vec<PathBuf>> {
    let mut workspaces = load(repository)?.workspaces;
    workspaces.push(workspace);
    save_workspace(repository, workspaces.clone())?;

    Ok(workspaces)
}

pub fn remove_workspace(repository: &impl ConfigRepository, workspace: PathBuf) -> Result<()> {
    let workspaces: Vec<_> = load_workspace(repository)?
        .into_iter()
        .filter(|v| v != &workspace)
        .collect();

    save_workspace(repository, workspaces)
}
