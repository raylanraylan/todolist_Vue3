<script setup>
import { watch } from 'vue';
import AddTask from '@/components/AddTask.vue';
import DragPriority from '@/components/DragPriorityTask.vue'
import DragNormal from '@/components/DragNormalTask.vue';
import DragFinish from '@/components/DragFinishTask.vue';
import Footer from '@/components/Footer.vue';
import { dataStone } from '@/stores/data';

// import draggable from 'vuedraggable'
// import draggable from '../../node_modules/vuedraggable'

let data = dataStone();

//當array資料改變時，就重新取得資料
watch(data.dataArray, () => {
  data.getItem();  
  // location.reload();
}, { deep: true })

</script>
<template>
  <main>
    <div class="add_task">
      <AddTask></AddTask>
    </div>
    <div class="taskOverview">
      <DragPriority></DragPriority>
      <DragNormal></DragNormal>
      <DragFinish></DragFinish>
    </div>
  </main>
  <footer></footer>
</template>

<style lang="scss" scoped>
main {
  max-width: 620px;
  margin: 0 auto;
}
.add_task {
  margin: 24px 0;
}

.taskOverview {
  display: flex;
  flex-direction: column;
  &>*{
    margin-bottom: 8px;
  }
  &:last-child{
    margin-bottom: 0;
  }
}

</style>