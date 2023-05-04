<template>
  <div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="Form Details">
        In addition to submitting data, forms are sometimes used to display read-only information.
      </n-card>
    </div>
    <n-card
      :bordered="false"
      title="Basic Information"
      class="mt-4 proCard"
      size="small"
      :segmented="{ content: true }"
    >
      <n-descriptions label-placement="left" class="py-2">
        <n-descriptions-item>
          <template #label>Payee Name</template>
          Ah Jun
        </n-descriptions-item>
        <n-descriptions-item label="Receiving account">NaiveUiAdmin@qq.com</n-descriptions-item>
        <n-descriptions-item label="Payment Type">Alipay</n-descriptions-item>
        <n-descriptions-item label="Payment Account">NaiveUiAdmin@163.com</n-descriptions-item>
        <n-descriptions-item label="transfer amount">￥1980.00</n-descriptions-item>
        <n-descriptions-item label="status">
          <n-tag type="success"> Arrived</n-tag>
        </n-descriptions-item>
      </n-descriptions>
    </n-card>
    <n-card
      :bordered="false"
      title="Other information"
      class="mt-4 proCard"
      size="small"
      :segmented="{ content: true }"
    >
      <n-descriptions label-placement="left" class="py-2">
        <n-descriptions-item>
          <template #label>City</template>
          Shenzhen
        </n-descriptions-item>
        <n-descriptions-item label="gender">Male</n-descriptions-item>
        <n-descriptions-item label="Email">NaiveUiAdmin@qq.com</n-descriptions-item>
        <n-descriptions-item label="Address"
          >Nanshan District, Shenzhen City, Guangdong Province</n-descriptions-item
        >
        <n-descriptions-item label="Birthday">1991-06-04</n-descriptions-item>
        <n-descriptions-item label="Authentication">
          <n-tag type="success"> Authenticated</n-tag>
        </n-descriptions-item>
      </n-descriptions>
    </n-card>
    <n-card
      :bordered="false"
      title="Form information"
      class="mt-4 proCard"
      size="small"
      :segmented="{ content: true }"
    >
      <n-table :bordered="false" :single-line="false">
        <thead>
          <tr>
            <th>Name</th>
            <th>gender</th>
            <th>city</th>
            <th>birthday</th>
            <th width="150">Operation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Ah Jung</td>
            <td>Male</td>
            <td>Shenzhen</td>
            <td>1993-11-09</td>
            <td>
              <n-space>
                <n-button size="small" type="error">Delete</n-button>
                <n-button size="small" type="info">View</n-button>
              </n-space>
            </td>
          </tr>
          <tr>
            <td>Ximen Snow</td>
            <td>Male</td>
            <td>Guangzhou</td>
            <td>1991-09-11</td>
            <td>
              <n-space>
                <n-button size="small" type="error">Delete</n-button>
                <n-button size="small" type="info">View</n-button>
              </n-space>
            </td>
          </tr>
          <tr>
            <td>Titans</td>
            <td>Male</td>
            <td>Beijing</td>
            <td>1990-11-03</td>
            <td>
              <n-space>
                <n-button size="small" type="error">Delete</n-button>
                <n-button size="small" type="info">View</n-button>
              </n-space>
            </td>
          </tr>
          <tr>
            <td>The Witcher</td>
            <td>Female</td>
            <td>Shanghai</td>
            <td>1992-03-11</td>
            <td>
              <n-space>
                <n-button size="small" type="error">Delete</n-button>
                <n-button size="small" type="info">View</n-button>
              </n-space>
            </td>
          </tr>
        </tbody>
      </n-table>
    </n-card>
  </div>
</template>

<script setup></script>

<style lang="less" scoped></style>
