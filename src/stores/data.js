import { defineStore } from 'pinia'

export const dataStone = defineStore('dataArray', () => {
  let dataArray = JSON.parse(localStorage.getItem("item")) || [];
  // 可以正常執行saveItem也會更新DOM，可是localStorage.setItem只會讓資料儲存一次，ID也不會更新
  // const saveItem = () =>{
  //  console.log('set');
  //  localStorage.setItem("item", JSON.stringify(dataArray));
  // }
  const getItem = ()=>{
    // console.log('get');
    dataArray = JSON.parse(localStorage.getItem("item")) || [];
  }
  return { dataArray,getItem }
})
