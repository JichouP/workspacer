use anyhow::Result;
use std::path::PathBuf;

#[derive(Debug, Clone, Default, Serialize, Deserialize)]
pub struct Config {
    pub workspaces: Vec<PathBuf>,
}

impl Config {
    pub fn new(workspaces: Vec<PathBuf>) -> Self {
        Self { workspaces }
    }
}

pub trait ConfigRepository {
    fn init(&self) -> Result<Config>;
    fn load(&self) -> Result<Config>;
    fn save(&self, config: &Config) -> Result<()>;
}
