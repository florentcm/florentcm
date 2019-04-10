<template>
  <div>
    <v-progress-circular :size="50" color="grey" class="loader" indeterminate v-show="isLoading"></v-progress-circular>
    <div v-if="feed">
      <div v-for="item in feed.items" :key="item.link">
        <v-card
          class="my-3 post"
          hover
          v-on:click.native="handleCardClick(item.link, $event)"
          v-bind:lang="isFrench(item) ? 'fr' : 'en'"
        >
          <v-card-media
            class="white--text"
            height="170px"
            :src="str_img_src(item['content:encoded'])"
          >
            <v-container fill-height fluid class="card-img">
              <v-layout>
                <v-flex xs12 align-end d-flex>
                  <span class="headline">{{ item.title }}</span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-media>
          <v-card-text>
            <span class="date">{{ item.isoDate | date('YYYY/MM/DD hh:mm') }}</span>
            <p
              v-html="$options.filters.truncate(item['content:encoded'].replace(/<(?:.|\n)*?>/gm, ''),120)"
              class="excerpt"
            ></p>
          </v-card-text>
          <v-card-actions>
            <v-btn
              v-on:click.stop
              icon
              class="blue--text secondary-action"
              target="_blank"
              :href="'https://www.facebook.com/sharer/sharer.php?u=' + encodeURI(item.link)"
            >
              <v-icon medium>fa-facebook</v-icon>
            </v-btn>
            <v-btn
              v-on:click.stop
              icon
              class="light-blue--text secondary-action"
              target="_blank"
              :href="'https://twitter.com/home?status=' + encodeURI(item.link)"
            >
              <v-icon medium>fa-twitter</v-icon>
            </v-btn>
            <v-btn
              v-on:click.stop
              icon
              class="red--text secondary-action"
              target="_blank"
              :href="'http://www.reddit.com/submit?url=' + encodeURI(item.link) + '&title=' + encodeURI(item.title)"
            >
              <v-icon medium>fa-reddit</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              v-on:click.stop
              flat
              class="grey--text main-action"
              :href="item.link"
              target="_blank"
            >{{ isFrench(item) ? 'Lire la suite' : 'Read More'}}</v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
let Parser = require('rss-parser');
let parser = new Parser();

export default {
  data() {
    return {
      isLoading: false,
      feedUrl: 'https://medium.com/feed/@florentcm',
      feed: false
    };
  },

  filters: {
    date: function(str, format = 'MM/DD/YYYY hh:mm') {
      return moment(String(str)).format(format);
    }
  },

  methods: {
    handleCardClick(link, event) {
      window.open(link, '_blank');
    },
    isFrench(item) {
      return !!item.categories.find(
        c => c === 'french' || c === 'fr' || c === 'françai' || c === 'français'
      );
    },
    fetchFeed() {
      this.isLoading = true;
      let context = this;
      parser.parseURL(CORS_PROXY + this.feedUrl, function(err, feed) {
        context.feed = feed;
        context.isLoading = false;
      });
    },
    str_img_src($html) {
      var m,
        urls = [],
        rex = /<img[^>]+src="?([^"\s]+)"?\s*\/>/g;

      while ((m = rex.exec($html))) {
        urls.push(m[1]);
      }

      if (urls.length) {
        return urls[0];
      } else {
        return null;
      }
    }
  },

  mounted() {
    this.fetchFeed();
  }
};
</script>

<style lang="scss">
.post {
  overflow: hidden;
}
.card-img {
  &:before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }
  > * {
    z-index: 2;
  }
}

.loader {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  @media screen and (min-width: 600px) {
    transform: translate(-50%, -50%);
    top: 50%;
    left: 75%;
  }
}
</style>
