<template>
<MttkWrapComp :config="config"></MttkWrapComp>

</template>

<script lang="ts" setup>
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036'
  },
  {
    date: '2016-05-08',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036'
  },
  {
    date: '2016-05-06',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036'
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036'
  }
]

const config = {
  '~': 'el-table',
  data: tableData,
 // style: { width: '60%' },
 style:'width:60%;height:320px;background-color:red;padding:12px;',
  '#': [
    {
      '~': 'el-table-column',
      prop: 'date',
      label: 'Date',
      width: 150
    },
    {
      '~': 'el-table-column',
      label: 'Delivery Info',
      '#': function(){return [
        {
          '~': 'el-table-column',
          prop: 'name',
          label: 'Name',
          width: 120
        },
        {
          '~': 'el-table-column',
          label: 'Address Info',
          '#': [
            {
              '~': 'el-table-column',
              prop: 'state',
              label: 'State',
              width: 150
            },
            {
              '~': 'el-table-column',
              prop: 'city',
              label: 'City',
              width: 150
            },
            {
              '~': 'el-table-column',
              prop: 'address',
              label: 'Address',
              width: 150
            },
            {
              '~': 'el-table-column',
              prop: 'zip',
              label: 'Zip',
              width: 150
            }
          ]
        }
      ]}
    }
  ]
}
</script>
