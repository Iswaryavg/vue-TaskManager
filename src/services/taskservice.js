import { supabase } from '@/lib/SupabaseClient'

// GET
export async function fetchTasks() {
  const { data, error } = await supabase
    .from('tasks')
    .select()

  if (error) throw error
  return data
}

// INSERT
export async function createTask(task) {
  const { error } = await supabase
    .from('tasks')
    .insert(task)

  if (error) throw error
}

// UPDATE
export async function updateTask(id, updates) {
  const { error } = await supabase
    .from('tasks')
    .update(updates)
    .eq('id', id)

  if (error) throw error
}

// DELETE
export async function deleteTask(id) {
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id)

  if (error) throw error
}
