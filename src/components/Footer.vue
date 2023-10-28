<script setup>
import { dataStone } from '@/stores/data';
import { ref, watch,} from 'vue';

const data = dataStone();
//預設值
// const toDoTask = data.dataArray.filter(data=>!data.isFinish).length;
const tasks = ref(data.dataArray.filter(data=>!data.isFinish).length)

//當預設值變動時重新賦值
watch(()=>data.dataArray.filter(data=>!data.isFinish).length
,()=>{ 
  const toDoTask = data.dataArray.filter(data=>!data.isFinish).length;
  tasks.value = toDoTask;
})

</script>
<template>
  <footer>
    <p class="count"><span>{{ tasks }}</span> tasks left</p>
  </footer>
</template>
<style lang="scss">
footer {
  max-width: 620px;
  margin: 8px auto 0;
}
.count {
  margin-left: 16px;
  font-style: italic;
  color:$gray-700;
}
</style>