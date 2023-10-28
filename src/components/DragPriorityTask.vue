<script setup>
import { watch } from 'vue';
import Task from './Task.vue';
import { dataStone } from '@/stores/data';

import draggable from 'vuedraggable'


let data = dataStone();

//當array資料改變時，就重新取得資料
watch(data.dataArray, () => {
  data.getItem();  
  // location.reload();
}, { deep: true })


const changeFile=(fileData)=>{
  data.dataArray[fileData.id].fileName = fileData.fileName
  data.dataArray[fileData.id].fileDate = fileData.fileDate
  saveData();
}

const toggleTaskState = (type,id)=>{
  const index = data.dataArray.findIndex((element)=>element.id===id)
  data.dataArray[index][type] = !data.dataArray[index][type];
  localStorage.setItem("item", JSON.stringify(data.dataArray));
}

const saveData=()=>{
  localStorage.setItem("item", JSON.stringify(data.dataArray));
}

</script>

<script>
//拖曳用的script
import draggable from 'vuedraggable'
export default {
  data() {
    return {
      dragging: false,
      taskData:dataStone().dataArray,
      state:{pull:false,push:false}
    };
  },
  methods:{
    dragEnd:function(event){
      const oldIndex = event.oldDraggableIndex;
      const newIndex = event.newDraggableIndex;
      if (newIndex>oldIndex){
        [this.taskData[oldIndex],this.taskData[newIndex]]=[this.taskData[newIndex],this.taskData[oldIndex]]
      } else {
        [this.taskData[newIndex],this.taskData[oldIndex]]=[this.taskData[oldIndex],this.taskData[newIndex]]
      }
      localStorage.setItem("item", JSON.stringify(this.taskData));
      this.dataStone.getItem();
      this.dragging = false
    },
    updateData:function(){
      this.dataStone.getItem();
      this.priority = dataStone().dataArray.filter(data=>data.isPriority===true&&data.isFinish===false)
    }
  },
  computed: {
    getPriority: {
      get() {
        const priority = this.taskData.filter(data=>data.isPriority===true&&data.isFinish===false)
        return priority;
      },
      set() {
        this.taskData.getItem();
      }
    }
  },
};
</script>

<template>
  <draggable 
    class="taskGroup"
    @start="dragging = true"
    @end="dragEnd"
    item-key="id"
    :group="state"
    v-model="getPriority"
  >
    <template #item="{ element }">
      <div class="task" :key="data.id">
        <Task :data="element" :key="data.id" @update-data="saveData" @get-file-data="changeFile" @change-task-state="toggleTaskState"></Task>
      </div>
    </template>
  </draggable>
</template>

<style lang="scss" scoped>
.taskGroup {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.margin{
  margin-bottom: 8px;
}
</style>