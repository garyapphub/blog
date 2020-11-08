$(document).ready(function() {
    var douban_api_keys = [
      '054022eaeae0b00e0fc068c0c0a2102a',
      '0b2bdeda43b5688921839c8ecb20399b',
      '0df993c66c0c636e29ecbb5344252a4a',
      '0dad551ec0f84ed02907ff5c42e8ec70',
      '0bcf52793711959c236df76ba534c0d4',
    ];
    var douban_api_key = douban_api_keys[0];

    function douban_book_card(book_id) {
      var url = 'https://api.douban.com/v2/book/' + book_id + '?apikey=' + douban_api_key;
      $.ajax({
        url: url,
        type: 'GET',
        dataType: 'JSONP',
        success: function(data) {
          var tags = [];

          var author_str = data.author[0];
          tags.push(author_str);

          var publisher_str = data.publisher;
          tags.push(publisher_str);

          var pubdate_str = data.pubdate.substring(0, 4);
          tags.push(pubdate_str);

          var title = data.title;
          var stars = Math.round(data.rating.average);
          var rating = data.rating.average;
          var img_url = data.images.small;
          var summary = data.summary.replace(/[\n|\r]/g, '');

          $('#douban-card-book-' + book_id).html(
            '<div class="douban-card--middle">' +
              '<div class="douban-card--title">' +
                '<a href="https://book.douban.com/subject/' + book_id + '/" target="_blank">' + title + '</a>' +
              '</div>' +
              '<div class="douban-card--stars-rating">' +
                '<span class="douban-card--logo-dou">豆</span>' +
                '<span class="douban-card--logo-rating">豆瓣评分</span>' +
                '<span class="douban-card--stars douban-card--stars-' + stars + '"></span>' +
                '<span class="douban-card--rating">' + rating + '</span>' +
              '</div>' +
              '<div class="douban-card--tags">' + tags.join(' / ') + '</div>' +
              '<div class="douban-card--summary">' + summary + '</div>' +
            '</div>' +
            '<div class="douban-card--right">' +
              '<img src="' + img_url + '" referrerPolicy="no-referrer" />' +
            '</div>'
          );
        }
      });
    }

    function douban_movie_card(movid_id) {
      var url = 'https://api.douban.com/v2/movie/subject/' + movid_id + '?apikey=' + douban_api_key;
      $.ajax({
        url: url,
        type: 'GET',
        dataType: 'JSONP',
        success: function(data) {
          var tags = [];

          var directors_str = '导演: ' + data.directors[0].name;
          tags.push(directors_str);

          var casts_str = '主演: ' + data.casts.map(function(cast) { return cast.name }).join(' ');
          tags.push(casts_str);

          var countries_str = data.countries.join(' ');
          tags.push(countries_str);

          var pubdates_str = data.pubdates[0].substring(0, 4);
          tags.push(pubdates_str);

          var title = data.title;
          var stars = Math.round(data.rating.average);
          var rating = data.rating.average;
          var img_url = data.images.small;
          var summary = data.summary.replace(/[\n|\r]/g, '');

          $('#douban-card-movie-' + movid_id).html(
            '<div class="douban-card--middle">' +
              '<div class="douban-card--title">' +
                '<a href="https://movie.douban.com/subject/' + movid_id + '/" target="_blank">' + title + '</a>' +
              '</div>' +
              '<div class="douban-card--stars-rating">' +
                '<span class="douban-card--logo-dou">豆</span>' +
                '<span class="douban-card--logo-rating">豆瓣评分</span>' +
                '<span class="douban-card--stars douban-card--stars-' + stars + '"></span>' +
                '<span class="douban-card--rating">' + rating + '</span>' +
              '</div>' +
              '<div class="douban-card--tags">' + tags.join(' / ') + '</div>' +
              '<div class="douban-card--summary">' + summary + '</div>' +
            '</div>' +
            '<div class="douban-card--right">' +
              '<img src="' + img_url + '" referrerPolicy="no-referrer" />' +
            '</div>'
          );
        }
      });
    }

    $('.douban-card').each(function() {
      var douban_id = $(this).attr('douban-id');
      if ($(this).hasClass('douban-card-book')) {
        douban_book_card(douban_id);
      } else if ($(this).hasClass('douban-card-movie')) {
        douban_movie_card(douban_id);
      }
    });
});