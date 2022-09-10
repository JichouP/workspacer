use crate::domain::config::{Config, ConfigRepository};
use anyhow::Result;
use serde_json::json;
use std::{fs, path::PathBuf};

const CONFIG_FILENAME: &str = "workspace-config.json";

#[derive(Debug, Clone)]
pub struct ConfigRepositoryImpl {
    config_filepath: PathBuf,
}

impl ConfigRepositoryImpl {
    pub fn new(app_dir: PathBuf) -> Self {
        Self {
            config_filepath: app_dir.join(CONFIG_FILENAME),
        }
    }
}

impl ConfigRepository for ConfigRepositoryImpl {
    fn init(&self) -> Result<Config> {
        let default_config = Config::default();
        self.save(&default_config)?;

        Ok(default_config)
    }

    fn load(&self) -> Result<Config> {
        let config_string = fs::read_to_string(&self.config_filepath)?;

        serde_json::from_str::<Config>(&config_string).map_err(anyhow::Error::from)
    }

    fn save(&self, config: &Config) -> Result<()> {
        let config_string: String = json!(config).to_string();
        if !&self.config_filepath.exists() {
            fs::create_dir_all(&self.config_filepath.parent().unwrap())?;
        };
        fs::write(&self.config_filepath, config_string)?;

        Ok(())
    }
}
