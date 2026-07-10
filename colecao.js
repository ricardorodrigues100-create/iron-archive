/**
 * colecao.js — carrega os veículos do Supabase e popula as páginas públicas
 * Inclui este script ANTES do script principal de cada página.
 * 
 * A página pública usa o Supabase em modo leitura (anon key).
 * Se o Supabase não estiver configurado, usa os dados estáticos da página.
 */

(async function () {
  const url = localStorage.getItem('sb_url');
  const key = localStorage.getItem('sb_key');
  if (!url || !key) return; // usa dados estáticos

  try {
    const res = await fetch(
      `${url}/rest/v1/veiculos?select=*&order=ordem.asc`,
      { headers: { apikey: key, Authorization: `Bearer ${key}` } }
    );
    if (!res.ok) throw new Error(res.status);
    const data = await res.json();
    if (!data.length) return;

    // Expõe os dados globalmente para o script da página usar
    window.__veiculosSupa = data;
  } catch (e) {
    console.warn('[colecao.js] Supabase não disponível, a usar dados estáticos.', e);
  }
})();
