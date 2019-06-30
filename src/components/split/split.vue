<template>
  <div class="Separate border-topbottom"></div>
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped>
    .Separate
      height: 18px
      background: #f3f5f7
      &.border-topbottom::before,&.border-topbottom::after
        border-color: rgba(7,17,27,0.1)
</style>
