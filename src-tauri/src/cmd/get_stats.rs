use std::fs;

use languatage::LanguageStat;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Stat {
    lang: String,
    percentage: f64,
    size: u64,
}

impl From<LanguageStat> for Stat {
    fn from(
        LanguageStat {
            lang,
            percentage,
            size,
        }: LanguageStat,
    ) -> Self {
        Self {
            lang,
            percentage,
            size,
        }
    }
}

#[command]
pub fn get_stats(workspace_path: String) -> Vec<Vec<Stat>> {
    let dirs: Vec<Vec<Stat>> = fs::read_dir(workspace_path)
        .unwrap()
        .map(|dir| {
            let path = dir.unwrap().path().to_string_lossy().to_string();
            let stat: Vec<Stat> = languatage::get_stat(path)
                .iter()
                .map(|stat| Stat::from(stat.clone()))
                .collect();

            stat
        })
        .collect();

    dirs
}
