// Scan semua SVG di folder flags
const modules = import.meta.glob("../assets/flags/*.svg", { eager: true });

// Hasil objek akhir
export const flagIcons = {};

// Loop semua file
for (const path in modules) {
  // Ambil nama file
  const fileName = path.split("/").pop(); // id.svg
  const code = fileName.replace(".svg", "").toUpperCase(); // "ID"

  // Simpan mapping: { ID: URL }
  flagIcons[code] = modules[path].default;
}
