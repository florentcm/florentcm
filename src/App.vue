<template>
  <v-app>
    <v-content>
      <Blog/>
    </v-content>
    <v-footer :fixed="fixed" app>
      <v-content>
        <span>&copy; Made with &hearts; and VueJS.</span>
      </v-content>
    </v-footer>
  </v-app>
</template>

<script>
import Blog from '@/components/Blog'

export default {
  name: 'App',
  components: {
    Blog
  },
  data () {
    return {
      
    }
  }
}
</script>
