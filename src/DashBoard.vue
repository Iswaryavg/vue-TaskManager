  <template>
  <h1 class="text-center">Task Manager</h1>
<hr/>
  <main>
<SideBar/>
<TaskList :tasks="filtereddata" @add="openAddModal()" @edit="editTask" @delete="deleteTaskHandler" @filtereddata="handleFilter"/>
  <section>
    <Teleport to="body">
        <div v-if="open" class="task-modal-overlay">
       <form action=""  @submit.prevent class="task-modal">
      <label for="" placeholder="title">Title</label>
      <input type="text" name="" placeholder="Enter task title" v-model="formdata.tasktitle"><br>

      <label for="" placeholder="title">Description</label>
      <input type="text" name="" placeholder="Enter task description" v-model="formdata.taskcontent"><br>

      <label for="" placeholder="title">Status</label>
<select v-model="formdata.status">
    <option disabled value="">Please select one</option>
    <option value="In progress" default>In Progress</option>
  <option value="To do">To Do</option>
  <option value="Done">Done</option>
</select>
<label for="due">Due by:</label>
<input type="date" id="start" name="trip-start" value="2026-01-01"  min="2026-01-01" max="2038-12-31" v-model="formdata.deadline"/>

<hr/>
<button class="btn btn-primary" type="button" @click="submitData">Save</button>&nbsp;
<button class="btn btn-primary" type="button" @click="open=false">Cancel</button>


</form>
</div>
    </Teleport>

  </section>
  </main>
</template>
<script setup>
import SideBar from './SideBar.vue';
import TaskList from './TaskList.vue';
import {ref,reactive,onMounted} from 'vue';
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask
} from './services/taskservice'

const open=ref(false);

const formdata=reactive({tasktitle:'',taskcontent:'',status:'',deadline:'2026-01-01',id:generateId()});
const filtereddata=ref([]);
const allTasks = ref([])
onMounted(()=>{
 getTasklists()
})
async function getTasklists()
{
  const data=await fetchTasks();
  allTasks.value=data;
  filtereddata.value=data;

}
function handleFilter(status){
  console.log(status)
   if (status === 'All')
 { filtereddata.value=allTasks.value;

 }
 else
  { filtereddata.value = allTasks.value.filter(task => task.status === status)


  }
  }
function generateId() {
  return crypto.randomUUID()
}
async function openAddModal()
{
       resetForm();
       open.value=true;
}
const editingId=ref(null);
async function submitData() {
  try {
    if (editingId.value) {
      await updateTask(editingId.value, {
        tasktitle: formdata.tasktitle,
        taskcontent: formdata.taskcontent,
        status: formdata.status,
        deadline: formdata.deadline
      })
    } else {
      await createTask({
        tasktitle: formdata.tasktitle,
        taskcontent: formdata.taskcontent,
        status: formdata.status,
        deadline: formdata.deadline
      })
    }

    await getTasklists()
    resetForm()
    open.value = false
  } catch (err) {
    console.error(err.message)
  }
}

function resetForm() {
  formdata.tasktitle = ''
  formdata.taskcontent = ''
  formdata.status = ''
   editingId.value = null


}


async function editTask(d) {
  editingId.value = d.id
  Object.assign(formdata, {
    tasktitle: d.tasktitle ?? '',
    taskcontent: d.taskcontent ?? '',
    status: d.status ?? '',
    deadline: d.deadline ? d.deadline.slice(0,10) : '',
  })


  open.value = true
}

async function deleteTaskHandler(task) {
  try {
    await deleteTask(task.id)
    await getTasklists()
  } catch (err) {
    console.error(err.message)
  }
}

</script>
