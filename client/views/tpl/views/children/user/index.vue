<template>
  <div>
    <p @click='$router.replace("/two")'>go '/two'</p>
    <p @click='$router.replace("/tpl/2231")'>tpl-User</p>
  </div>
</template>

<script>
export default {
  name: 'TplUser',
}
</script>

