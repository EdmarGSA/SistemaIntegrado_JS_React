import React, { useEffect, useState } from 'react'
import { supabase } from '../services/supabase'

function CriarLote() {
  const [tecnicos, setTecnicos] = useState([])
  const [integrados, setIntegrados] = useState([])
  const [galpoes, setGalpoes] = useState([])
  const [form, setForm] = useState({
    nome: '',
    tecnico_id: '',
    integrado_id: '',
    galpao_id: ''
  })

  useEffect(() => {
    fetchDropdowns()
  }, [])

  async function fetchDropdowns() {
    const { data: t } = await supabase.from('tecnicos').select('*')
    const { data: i } = await supabase.from('integrados').select('*')
    const { data: g } = await supabase.from('galpoes').select('*')
    setTecnicos(t || [])
    setIntegrados(i || [])
    setGalpoes(g || [])
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const { error } = await supabase.from('lotes').insert([form])
    if (error) alert('Erro: ' + error.message)
    else alert('✅ Lote criado com sucesso!')
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-6 max-w-xl">
      <h2 className="text-xl font-semibold mb-4">Criar Novo Lote</h2>
      <input className="w-full p-2 border rounded mb-3" placeholder="Nome do Lote" 
        value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} />

      <select className="w-full p-2 border rounded mb-3" 
        onChange={e => setForm({ ...form, tecnico_id: e.target.value })}>
        <option value="">Selecione o Técnico</option>
        {tecnicos.map(t => <option key={t.id} value={t.id}>{t.nome}</option>)}
      </select>

      <select className="w-full p-2 border rounded mb-3" 
        onChange={e => setForm({ ...form, integrado_id: e.target.value })}>
        <option value="">Selecione o Integrado</option>
        {integrados.map(i => <option key={i.id} value={i.id}>{i.nome}</option>)}
      </select>

      <select className="w-full p-2 border rounded mb-3" 
        onChange={e => setForm({ ...form, galpao_id: e.target.value })}>
        <option value="">Selecione o Galpão</option>
        {galpoes.map(g => <option key={g.id} value={g.id}>{g.nome}</option>)}
      </select>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Salvar Lote
      </button>
    </form>
  )
}

export default CriarLote