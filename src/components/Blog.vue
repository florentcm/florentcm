<template>
  <div v-if="feed">
    <div v-for="item in feed.items" :key="item.link">
      <v-card class="my-3 post" hover>
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
          <p v-html="$options.filters.truncate(item['content:encoded'].replace(/<(?:.|\n)*?>/gm, ''),120)" class="excerpt"></p>
        </v-card-text>
        <v-card-actions>
          <v-btn icon class="blue--text" target="_blank"
          :href="'https://www.facebook.com/sharer/sharer.php?u=' + encodeURI(item.link)">
            <v-icon medium>fa-facebook</v-icon>
          </v-btn>
          <v-btn icon class="light-blue--text" target="_blank"
          :href="'https://twitter.com/home?status=' + encodeURI(item.link)">
            <v-icon medium>fa-twitter</v-icon>
          </v-btn>
          <v-btn icon class="red--text" target="_blank"
          :href="'http://www.reddit.com/submit?url=' + encodeURI(item.link) + '&title=' + encodeURI(item.title)">
            <v-icon medium>fa-reddit</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn flat class="grey--text">Read More</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
let Parser = require("rss-parser");
let parser = new Parser();

export default {
  data() {
    return {
      isLoading: false,
      feedUrl: "https://medium.com/feed/@florentcm",
      feed: false
    };
  },

  filters: {
    date: function(str, format = 'MM/DD/YYYY hh:mm'){
      return moment(String(str)).format(format);
    }
  },

  methods: {
    fetchFeed() {
      this.isLoading = true;
      let context = this;
      parser.parseURL(CORS_PROXY + this.feedUrl, function(
        err,
        feed
      ) {
        context.feed = feed;
        context.isLoading = false;
      });
    },
    xmlToJson(xml) {
      // Create the return object
      var obj = {};

      if (xml.nodeType == 1) {
        // element
        // do attributes
        if (xml.attributes.length > 0) {
          obj["@attributes"] = {};
          for (var j = 0; j < xml.attributes.length; j++) {
            var attribute = xml.attributes.item(j);
            obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
          }
        }
      } else if (xml.nodeType == 3) {
        // text
        obj = xml.nodeValue;
      }

      // do children
      if (xml.hasChildNodes()) {
        for (var i = 0; i < xml.childNodes.length; i++) {
          var item = xml.childNodes.item(i);
          var nodeName = item.nodeName;
          if (typeof obj[nodeName] == "undefined") {
            obj[nodeName] = xmlToJson(item);
          } else {
            if (typeof obj[nodeName].push == "undefined") {
              var old = obj[nodeName];
              obj[nodeName] = [];
              obj[nodeName].push(old);
            }
            obj[nodeName].push(xmlToJson(item));
          }
        }
      }
      return obj;
    },
    str_img_src($html) {
      var m,
      urls = [],
      rex = /<img[^>]+src="?([^"\s]+)"?\s*\/>/g;

      while ( m = rex.exec( $html ) ) {
          urls.push( m[1] );
      }

      console.log( urls );
      
      if (urls.length) {
        return urls[0];
      } else {
        return false;
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
  overflow: hidden
}
.card-img{
  &:before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    z-index: 1;
  }
  > * {
    z-index: 2;
  }
}
</style>