"use client";

import { useEffect, useState, Suspense } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import styles from "@/app/admin/admin-shared.module.css";
import AdminNav from "@/components/AdminNav/AdminNav";
import Image from "next/image";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// Interfaces
interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  image: string;
  category: string;
}

interface GalleryImage {
  id: number;
  title: string;
  url: string;
  thumbnail: string;
  year: number;
  order: number;
}

function AdminContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();

  const view = searchParams.get("view") || "articles";

  // State
  const [loading, setLoading] = useState(true);

  // Articles State
  const [articles, setArticles] = useState<Article[]>([]);
  const [articleFormOpen, setArticleFormOpen] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState<number | null>(null);
  const [expandedArticleId, setExpandedArticleId] = useState<number | null>(
    null,
  );
  const [articleData, setArticleData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    date: new Date().toISOString().split("T")[0],
    author: "",
    image: "",
    category: "akce",
  });
  const [uploadingArticle, setUploadingArticle] = useState(false);

  // Gallery State
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [galleryFormOpen, setGalleryFormOpen] = useState(false);
  const [editingGalleryId, setEditingGalleryId] = useState<number | null>(null);
  const [expandedGalleryId, setExpandedGalleryId] = useState<number | null>(
    null,
  );
  const [galleryData, setGalleryData] = useState({
    title: "",
    url: "",
    thumbnail: "",
    year: new Date().getFullYear().toString(),
  });
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  // ReactQuill modules configuration
  const quillModules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [
          {
            color: [
              "#000000",
              "#e60000",
              "#ff9900",
              "#ffff00",
              "#008a00",
              "#0066cc",
              "#9933ff",
              "#ffffff",
              "#facccc",
              "#ffebcc",
              "#ffffcc",
              "#cce8cc",
              "#cce0f5",
              "#ebd6ff",
              "#bbbbbb",
              "#f06666",
              "#ffc266",
              "#ffff66",
              "#66b966",
              "#66a3e0",
              "#c285ff",
              "#888888",
              "#a10000",
              "#b26b00",
              "#b2b200",
              "#006100",
              "#0047b2",
              "#6b24b2",
              "#444444",
              "#5c0000",
              "#663d00",
              "#666600",
              "#003700",
              "#002966",
              "#3d1466",
            ],
          },
          {
            background: [
              "#000000",
              "#e60000",
              "#ff9900",
              "#ffff00",
              "#008a00",
              "#0066cc",
              "#9933ff",
              "#ffffff",
              "#facccc",
              "#ffebcc",
              "#ffffcc",
              "#cce8cc",
              "#cce0f5",
              "#ebd6ff",
              "#bbbbbb",
              "#f06666",
              "#ffc266",
              "#ffff66",
              "#66b966",
              "#66a3e0",
              "#c285ff",
              "#888888",
              "#a10000",
              "#b26b00",
              "#b2b200",
              "#006100",
              "#0047b2",
              "#6b24b2",
              "#444444",
              "#5c0000",
              "#663d00",
              "#666600",
              "#003700",
              "#002966",
              "#3d1466",
            ],
          },
        ],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ align: [] }],
        ["link", "image"],
        ["clean"],
      ],
      handlers: {},
    },
  };

  // Add hover titles for Quill toolbar buttons (Czech labels) with robust observer
  useEffect(() => {
    const setTitlesForToolbar = (tb: Element) => {
      const setTitle = (selector: string, title: string) => {
        tb.querySelectorAll(selector).forEach((el) =>
          el.setAttribute("title", title),
        );
      };
      setTitle("button.ql-bold", "Tučné");
      setTitle("button.ql-italic", "Kurzíva");
      setTitle("button.ql-underline", "Podtržení");
      setTitle("button.ql-strike", "Přeškrtnuté");
      setTitle("button.ql-link", "Odkaz");
      setTitle("button.ql-image", "Obrázek");
      setTitle("button.ql-clean", "Vyčistit formátování");
      setTitle('button.ql-list[value="ordered"]', "Seznam (číslovaný)");
      setTitle('button.ql-list[value="bullet"]', "Seznam (odrážky)");
      setTitle(".ql-picker.ql-color .ql-picker-label", "Barva textu");
      setTitle(".ql-picker.ql-background .ql-picker-label", "Barva pozadí");
      setTitle(".ql-picker.ql-align .ql-picker-label", "Zarovnání");
      setTitle(".ql-picker.ql-header .ql-picker-label", "Nadpis");
    };

    const applyToAllToolbars = () => {
      document
        .querySelectorAll(".ql-toolbar")
        .forEach((tb) => setTitlesForToolbar(tb));
    };

    applyToAllToolbars();

    const observer = new MutationObserver(() => {
      applyToAllToolbars();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [view, expandedArticleId, expandedGalleryId]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    } else if (status === "authenticated") {
      fetchData();
      if (!articleData.author) {
        setArticleData((prev) => ({
          ...prev,
          author: session?.user?.name || "",
        }));
      }
    }
  }, [status, router, session, view]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (view === "articles") {
        const res = await fetch("/api/articles");
        if (res.ok) setArticles(await res.json());
      } else {
        const res = await fetch("/api/gallery");
        if (res.ok) setGalleryImages(await res.json());
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- ARTICLES LOGIC ---
  const handleArticleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingArticle(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setArticleData({ ...articleData, image: data.url });
    } catch (error) {
      alert("Chyba při nahrávání obrázku");
    } finally {
      setUploadingArticle(false);
    }
  };

  const submitArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!articleData.title.trim() || !articleData.slug.trim()) {
      alert("Vyplňte povinná pole");
      return;
    }

    const payload = {
      ...articleData,
      image: articleData.image || "/images/placeholder.webp",
    };

    try {
      if (editingArticleId) {
        await fetch("/api/articles", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingArticleId, ...payload }),
        });
      } else {
        await fetch("/api/articles", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      resetArticleForm();
      fetchData();
    } catch (error) {
      alert("Chyba při ukládání");
    }
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  // --- GALLERY LOGIC ---
  const submitGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryData.title.trim() || !galleryData.url.trim()) {
      alert("Vyplňte povinná pole");
      return;
    }

    try {
      let thumbPath = galleryData.thumbnail;
      if (thumbnailFile) {
        const formData = new FormData();
        formData.append("file", thumbnailFile);
        formData.append("folder", "gallery");
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        if (!uploadRes.ok) throw new Error("Upload failed");
        const uploadData = await uploadRes.json();
        thumbPath = uploadData.url;
      }

      const payload = {
        title: galleryData.title,
        url: galleryData.url,
        thumbnail: thumbPath,
        year: parseInt(galleryData.year),
      };

      if (editingGalleryId) {
        await fetch("/api/gallery", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingGalleryId, ...payload }),
        });
      } else {
        await fetch("/api/gallery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      resetGalleryForm();
      fetchData();
    } catch (error) {
      alert("Chyba při ukládání");
    }
  };

  const resetGalleryForm = () => {
    setEditingGalleryId(null);
    setGalleryData({
      title: "",
      url: "",
      thumbnail: "",
      year: new Date().getFullYear().toString(),
    });
    setThumbnailFile(null);
    setGalleryFormOpen(false);
  };

  const resetArticleForm = () => {
    setEditingArticleId(null);
    setArticleFormOpen(false);
    setArticleData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      date: new Date().toISOString().split("T")[0],
      author: "",
      image: "",
      category: "akce",
    });
    setUploadingArticle(false);
  };

  // --- DELETE LOGIC ---
  const handleDelete = async (id: number, type: "articles" | "gallery") => {
    if (!confirm("Opravdu smazat?")) return;
    try {
      await fetch(`/api/${type}?id=${id}`, { method: "DELETE" });
      fetchData();
    } catch (e) {
      alert("Chyba při mazání");
    }
  };

  if (status === "loading")
    return <div className={styles.loading}>Načítám...</div>;
  if (!session) return null;

  return (
    <div className={styles.dashboardLayout}>
      <AdminNav />
      <main className={styles.mainContent}>
        {/* ARTICLES VIEW */}
        {view === "articles" && (
          <>
            <div className={styles.pageHeader}>
              <h1 className={styles.pageTitle}>Správa článků</h1>
              <button
                onClick={() => setArticleFormOpen(!articleFormOpen)}
                className={styles.primaryBtn}
              >
                {articleFormOpen ? "Zrušit" : "+ Nový článek"}
              </button>
            </div>

            {articleFormOpen && (
              <form
                onSubmit={submitArticle}
                className={`${styles.card} ${styles.formGrid}`}
              >
                <h2>{editingArticleId ? "Upravit článek" : "Nový článek"}</h2>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>Nadpis *</label>
                  <input
                    className={styles.input}
                    value={articleData.title}
                    onChange={(e) => {
                      const newTitle = e.target.value;
                      setArticleData((prev) => ({
                        ...prev,
                        title: newTitle,
                        slug: !editingArticleId
                          ? generateSlug(newTitle)
                          : prev.slug,
                      }));
                    }}
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>Slug *</label>
                  <input
                    className={styles.input}
                    value={articleData.slug}
                    onChange={(e) =>
                      setArticleData({ ...articleData, slug: e.target.value })
                    }
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>Perex *</label>
                  <textarea
                    className={styles.textarea}
                    value={articleData.excerpt}
                    onChange={(e) =>
                      setArticleData({
                        ...articleData,
                        excerpt: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>Obsah *</label>
                  <div className={styles.quill}>
                    <ReactQuill
                      value={articleData.content}
                      onChange={(val) =>
                        setArticleData({ ...articleData, content: val })
                      }
                      theme="snow"
                      modules={quillModules}
                    />
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: "1rem",
                  }}
                >
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Datum</label>
                    <input
                      type="date"
                      className={styles.input}
                      value={articleData.date}
                      onChange={(e) =>
                        setArticleData({ ...articleData, date: e.target.value })
                      }
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Autor</label>
                    <input
                      className={styles.input}
                      value={articleData.author}
                      onChange={(e) =>
                        setArticleData({
                          ...articleData,
                          author: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Kategorie</label>
                    <select
                      className={styles.select}
                      value={articleData.category}
                      onChange={(e) =>
                        setArticleData({
                          ...articleData,
                          category: e.target.value,
                        })
                      }
                    >
                      <option value="akce">Akce</option>
                      <option value="uspech">Úspěch</option>
                      <option value="treninky">Tréninky</option>
                      <option value="zavody">Závody</option>
                    </select>
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>Obrázek</label>
                  <input
                    type="file"
                    onChange={handleArticleImageUpload}
                    className={styles.input}
                  />
                  {uploadingArticle && <p>Nahrávám...</p>}
                  {articleData.image && (
                    <img
                      src={articleData.image}
                      alt="Preview"
                      style={{
                        maxHeight: 150,
                        maxWidth: 300,
                        marginTop: 10,
                        borderRadius: 8,
                        objectFit: "contain",
                      }}
                    />
                  )}
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    justifyContent: "flex-end",
                  }}
                >
                  <button
                    type="button"
                    onClick={resetArticleForm}
                    className={styles.secondaryBtn}
                  >
                    Zrušit
                  </button>
                  <button type="submit" className={styles.primaryBtn}>
                    {editingArticleId ? "Uložit" : "Vytvořit"}
                  </button>
                </div>
              </form>
            )}

            <div className={styles.card}>
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Název</th>
                      <th>Datum</th>
                      <th>Autor</th>
                      <th>Kategorie</th>
                      <th>Akce</th>
                    </tr>
                  </thead>
                  <tbody>
                    {articles.map((article) => (
                      <>
                        <tr key={article.id}>
                          <td>{article.title}</td>
                          <td>
                            {new Date(article.date).toLocaleDateString("cs")}
                          </td>
                          <td>{article.author}</td>
                          <td>
                            <span className={styles.statusBadge}>
                              {article.category}
                            </span>
                          </td>
                          <td>
                            <div style={{ display: "flex", gap: 8 }}>
                              <button
                                className={styles.secondaryBtn}
                                onClick={() => {
                                  setEditingArticleId(article.id);
                                  setExpandedArticleId(article.id);
                                  setArticleData({
                                    title: article.title,
                                    slug: article.slug,
                                    excerpt: article.excerpt,
                                    content: article.content,
                                    date: article.date,
                                    author: article.author,
                                    image: article.image,
                                    category: article.category,
                                  });
                                }}
                              >
                                Upravit
                              </button>
                              <button
                                className={styles.dangerBtn}
                                onClick={() =>
                                  handleDelete(article.id, "articles")
                                }
                              >
                                Smazat
                              </button>
                            </div>
                          </td>
                        </tr>
                        {expandedArticleId === article.id && (
                          <tr>
                            <td
                              colSpan={5}
                              style={{
                                padding: "20px",
                                background: "var(--color-gray-50)",
                              }}
                            >
                              <form
                                onSubmit={(e) => {
                                  e.preventDefault();
                                  submitArticle(e);
                                  setExpandedArticleId(null);
                                }}
                                style={{ display: "grid", gap: "16px" }}
                              >
                                <h3
                                  style={{
                                    margin: 0,
                                    color: "var(--color-gray-900)",
                                  }}
                                >
                                  Upravit článek
                                </h3>

                                <div className={styles.inputGroup}>
                                  <label className={styles.label}>
                                    Nadpis *
                                  </label>
                                  <input
                                    className={styles.input}
                                    value={articleData.title}
                                    onChange={(e) => {
                                      const newTitle = e.target.value;
                                      setArticleData((prev) => ({
                                        ...prev,
                                        title: newTitle,
                                        slug: !editingArticleId
                                          ? generateSlug(newTitle)
                                          : prev.slug,
                                      }));
                                    }}
                                    required
                                  />
                                </div>

                                <div className={styles.inputGroup}>
                                  <label className={styles.label}>Slug *</label>
                                  <input
                                    className={styles.input}
                                    value={articleData.slug}
                                    onChange={(e) =>
                                      setArticleData({
                                        ...articleData,
                                        slug: e.target.value,
                                      })
                                    }
                                    required
                                  />
                                </div>

                                <div className={styles.inputGroup}>
                                  <label className={styles.label}>
                                    Perex *
                                  </label>
                                  <textarea
                                    className={styles.textarea}
                                    value={articleData.excerpt}
                                    onChange={(e) =>
                                      setArticleData({
                                        ...articleData,
                                        excerpt: e.target.value,
                                      })
                                    }
                                    required
                                  />
                                </div>

                                <div className={styles.inputGroup}>
                                  <label className={styles.label}>
                                    Obsah *
                                  </label>
                                  <div className={styles.quill}>
                                    <ReactQuill
                                      value={articleData.content}
                                      onChange={(val) =>
                                        setArticleData({
                                          ...articleData,
                                          content: val,
                                        })
                                      }
                                      theme="snow"
                                      modules={quillModules}
                                    />
                                  </div>
                                </div>

                                <div
                                  style={{
                                    display: "grid",
                                    gridTemplateColumns: "1fr 1fr 1fr",
                                    gap: "1rem",
                                  }}
                                >
                                  <div className={styles.inputGroup}>
                                    <label className={styles.label}>
                                      Datum *
                                    </label>
                                    <input
                                      type="date"
                                      className={styles.input}
                                      value={articleData.date}
                                      onChange={(e) =>
                                        setArticleData({
                                          ...articleData,
                                          date: e.target.value,
                                        })
                                      }
                                      required
                                    />
                                  </div>

                                  <div className={styles.inputGroup}>
                                    <label className={styles.label}>
                                      Autor *
                                    </label>
                                    <input
                                      className={styles.input}
                                      value={articleData.author}
                                      onChange={(e) =>
                                        setArticleData({
                                          ...articleData,
                                          author: e.target.value,
                                        })
                                      }
                                      required
                                    />
                                  </div>

                                  <div className={styles.inputGroup}>
                                    <label className={styles.label}>
                                      Kategorie *
                                    </label>
                                    <select
                                      className={styles.select}
                                      value={articleData.category}
                                      onChange={(e) =>
                                        setArticleData({
                                          ...articleData,
                                          category: e.target.value,
                                        })
                                      }
                                      required
                                    >
                                      <option value="akce">Akce</option>
                                      <option value="novinky">Novinky</option>
                                      <option value="uspech">Úspěch</option>
                                    </select>
                                  </div>
                                </div>

                                <div className={styles.inputGroup}>
                                  <label className={styles.label}>
                                    Obrázek
                                  </label>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleArticleImageUpload}
                                    className={styles.input}
                                  />
                                  {uploadingArticle && <p>Nahrávám...</p>}
                                  {articleData.image && (
                                    <img
                                      src={articleData.image}
                                      alt="Preview"
                                      style={{
                                        maxHeight: 150,
                                        maxWidth: 300,
                                        marginTop: 10,
                                        borderRadius: 8,
                                        objectFit: "contain",
                                      }}
                                    />
                                  )}
                                </div>

                                <div
                                  style={{
                                    display: "flex",
                                    gap: 10,
                                    justifyContent: "flex-end",
                                  }}
                                >
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setExpandedArticleId(null);
                                      setEditingArticleId(null);
                                      resetArticleForm();
                                    }}
                                    className={styles.secondaryBtn}
                                  >
                                    Zrušit
                                  </button>
                                  <button
                                    type="submit"
                                    className={styles.primaryBtn}
                                  >
                                    Uložit
                                  </button>
                                </div>
                              </form>
                            </td>
                          </tr>
                        )}
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* GALLERY VIEW */}
        {view === "gallery" && (
          <>
            <div className={styles.pageHeader}>
              <h1 className={styles.pageTitle}>Správa galerie</h1>
              <button
                onClick={() => setGalleryFormOpen(!galleryFormOpen)}
                className={styles.primaryBtn}
              >
                {galleryFormOpen ? "Zrušit" : "+ Nové album"}
              </button>
            </div>

            {galleryFormOpen && (
              <form
                onSubmit={submitGallery}
                className={`${styles.card} ${styles.formGrid}`}
              >
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Název alba *</label>
                  <input
                    className={styles.input}
                    value={galleryData.title}
                    onChange={(e) =>
                      setGalleryData({ ...galleryData, title: e.target.value })
                    }
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>URL *</label>
                  <input
                    className={styles.input}
                    value={galleryData.url}
                    onChange={(e) =>
                      setGalleryData({ ...galleryData, url: e.target.value })
                    }
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Rok *</label>
                  <input
                    type="number"
                    className={styles.input}
                    value={galleryData.year}
                    onChange={(e) =>
                      setGalleryData({ ...galleryData, year: e.target.value })
                    }
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Thumbnail</label>
                  <input
                    type="file"
                    className={styles.input}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setThumbnailFile(file);
                        const reader = new FileReader();
                        reader.onloadend = () =>
                          setGalleryData((p) => ({
                            ...p,
                            thumbnail: reader.result as string,
                          }));
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  {galleryData.thumbnail && (
                    <img
                      src={galleryData.thumbnail}
                      alt="Preview"
                      style={{ height: 100, marginTop: 10, borderRadius: 8 }}
                    />
                  )}
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    justifyContent: "flex-end",
                  }}
                >
                  <button
                    type="button"
                    onClick={resetGalleryForm}
                    className={styles.secondaryBtn}
                  >
                    Zrušit
                  </button>
                  <button type="submit" className={styles.primaryBtn}>
                    {editingGalleryId ? "Uložit" : "Vytvořit"}
                  </button>
                </div>
              </form>
            )}

            <div className={styles.galleryGrid}>
              {galleryImages.map((img) => (
                <div key={img.id} className={styles.galleryCard}>
                  <img
                    src={img.thumbnail}
                    alt={img.title}
                    className={styles.galleryThumbnail}
                  />
                  <div className={styles.galleryContent}>
                    {expandedGalleryId === img.id ? (
                      // Inline edit form
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          submitGallery(e);
                          setExpandedGalleryId(null);
                        }}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "12px",
                        }}
                      >
                        <div className={styles.inputGroup}>
                          <label className={styles.label}>Název alba *</label>
                          <input
                            className={styles.input}
                            value={galleryData.title}
                            onChange={(e) =>
                              setGalleryData({
                                ...galleryData,
                                title: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div className={styles.inputGroup}>
                          <label className={styles.label}>URL *</label>
                          <input
                            className={styles.input}
                            value={galleryData.url}
                            onChange={(e) =>
                              setGalleryData({
                                ...galleryData,
                                url: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div className={styles.inputGroup}>
                          <label className={styles.label}>Rok *</label>
                          <input
                            type="number"
                            className={styles.input}
                            value={galleryData.year}
                            onChange={(e) =>
                              setGalleryData({
                                ...galleryData,
                                year: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div className={styles.inputGroup}>
                          <label className={styles.label}>Thumbnail</label>
                          <input
                            type="file"
                            className={styles.input}
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                setThumbnailFile(file);
                                const reader = new FileReader();
                                reader.onloadend = () =>
                                  setGalleryData((p) => ({
                                    ...p,
                                    thumbnail: reader.result as string,
                                  }));
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </div>
                        <div
                          style={{
                            display: "flex",
                            gap: "8px",
                            marginTop: "8px",
                          }}
                        >
                          <button
                            type="submit"
                            className={styles.primaryBtn}
                            style={{ flex: 1, padding: "8px" }}
                          >
                            Uložit
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setExpandedGalleryId(null);
                              setEditingGalleryId(null);
                              resetGalleryForm();
                            }}
                            className={styles.secondaryBtn}
                            style={{ flex: 1, padding: "8px" }}
                          >
                            Zrušit
                          </button>
                        </div>
                      </form>
                    ) : (
                      // Normal card view
                      <>
                        <h3 className={styles.galleryTitle}>{img.title}</h3>
                        <p>{img.year}</p>
                        <div className={styles.galleryActions}>
                          <button
                            className={styles.secondaryBtn}
                            onClick={() => {
                              setEditingGalleryId(img.id);
                              setExpandedGalleryId(img.id);
                              setGalleryData({
                                title: img.title,
                                url: img.url,
                                thumbnail: img.thumbnail,
                                year: img.year.toString(),
                              });
                              setThumbnailFile(null);
                            }}
                          >
                            Upravit
                          </button>
                          <button
                            className={styles.dangerBtn}
                            onClick={() => handleDelete(img.id, "gallery")}
                          >
                            Smazat
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default function AdminPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminContent />
    </Suspense>
  );
}
