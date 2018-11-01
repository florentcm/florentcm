<template>
  <v-app :dark="darktheme" class="app">
    <v-content>
      <v-container>
        <v-layout row wrap align-top>
          <v-flex xs12 sm4>
            <div class="text-xs-center sticky">
              <v-avatar size="125px">
                <img
                  class="img-circle elevation-7 mb-1"
                  src="https://pbs.twimg.com/profile_images/544896722808238080/_e3uVoUy_400x400.jpeg"
                >
              </v-avatar>
              <div class="headline">Florent <span style="font-weight:bold">Cima</span></div>
              <div class="subheading text-xs-center grey--text pt-1 pb-3">{{ bio }}</div>
                <v-btn absolute dark fab top left :class="{'dark': darktheme}" :color="darktheme ? 'white': 'black'" @click="darktheme = !darktheme">
<v-icon :color="!darktheme ? 'white': 'black'">invert_colors</v-icon>
              </v-btn>
            </div>
          </v-flex>
          <v-flex xs12 sm5 offset-sm2>
            <blog></blog>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer class="secondary" app>
      <v-layout row wrap align-center>
        <v-flex xs12>
          <div class="white--text ml-3">
            Made with
            <v-icon class="red--text">favorite</v-icon>
            and VueJS
          </div>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
import Blog from "./components/Blog";

export default {
  name: "App",
  components: {
    Blog
  },
  data() {
    return {
      darktheme: false,
      bio:
        "Lead Front-end Web Developer @nventive. 🖤 #HTML5 #SEO #Angular #Apple 🎻 and new Technologies. Chocovore, je tweet aussi en français!"
    };
  },
  mounted() {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      console.info('dark color scheme detected');
      this.darktheme = true;
    }
  }
};
</script>

<style lang="scss" scoped>

@media screen and (min-width: 600px) {
  .sticky {
    position: fixed;
    top: 50%;
    left: 25%;
    transform: translate(-50%, -50%);
    max-width: 30%;
  }
}
@media screen and (max-width: 600px) {
  .app {
    padding-top: 30px;
  }
}
</style>
