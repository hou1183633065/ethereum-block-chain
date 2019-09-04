<template>
  <div class="test">
    <SimpleStorage/>
  </div>
</template>

<script>
// @ is an alias to /src
import SimpleStorage from '@/components/SimpleStorage.vue'

export default {
  name: 'test',
  components: {
    SimpleStorage
  }
}
</script>
