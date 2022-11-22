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
    let mut dirs: Vec<(String, Vec<Stat>)> = fs::read_dir(path)
        .map_err(|e| e.to_string())?
        .filter(|dir| {
            let path = dir.as_ref().unwrap().path();
            !is_system_dir(&path) && !is_dot_dir(&path)
        })
        .filter(|dir| dir.as_ref().unwrap().metadata().unwrap().is_dir())
        .filter_map(|dir| {
            let dir = dir.ok()?;
            let path = dir.path().to_string_lossy().to_string();
            let stat: Vec<Stat> = languatage::get_stat(path)
                .ok()?
                .into_iter()
                .map(Stat::from)
                .collect();

            Some((dir.file_name().to_string_lossy().to_string(), stat))
        })
        .collect();

    dirs.sort_by_key(|(a, _)| a.to_lowercase());

    Ok(dirs)
}
