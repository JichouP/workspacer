use languatage::LanguageStat;
use std::{fs, path::Path};

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

fn is_system_dir<P: AsRef<Path>>(path: P) -> bool {
    [
        "$RECYCLE.BIN",
        "Recovery",
        "System Volume Information",
        ".DS_Store",
    ]
    .into_iter()
    .any(|p| path.as_ref().to_str().unwrap().contains(p))
}

fn is_dot_dir<P: AsRef<Path>>(path: P) -> bool {
    path.as_ref().to_str().unwrap() != "."
        && path
            .as_ref()
            .to_str()
            .unwrap()
            .split(&['/', '\\'][..])
            .last()
            .unwrap()
            .starts_with('.')
}

#[command]
pub fn get_stats(path: String) -> Result<Vec<(String, Vec<Stat>)>, String> {
    let dirs = match fs::read_dir(path) {
        Ok(v) => v,
        Err(e) => return Err(e.to_string()),
    };

    let dirs = dirs
        .filter(|dir| {
            let path = dir.as_ref().unwrap().path();
            !is_system_dir(&path) && !is_dot_dir(&path)
        })
        .filter(|dir| dir.as_ref().unwrap().metadata().unwrap().is_dir())
        .map(|dir| {
            let dir = dir.unwrap();
            let path = dir.path().to_string_lossy().to_string();
            let stat: Vec<Stat> = languatage::get_stat(path)
                .into_iter()
                .map(|stat| Stat::from(stat))
                .collect();

            (dir.file_name().to_string_lossy().to_string(), stat)
        })
        .collect();

    Ok(dirs)
}
