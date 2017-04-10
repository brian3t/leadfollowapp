/* globals $, window, document */
$(document).ready(function() {
  $.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
  });
  window.ga = window.ga || function () {};

  $('#demoForm').on('submit', function(e) {
    var demoForm = $(this);
    var data = demoForm.serializeArray();
    var json = {};
    data.forEach(function (element) {
      json[element.name] = element.value;
    });

    e.preventDefault();
    $.ajax({
      url: '/demoCreate',
      type: 'post',
      dataType: 'json',
      data: JSON.stringify(json),
      beforeSend: function() {
        demoForm.find(':submit').html('Sending').prop('disabled', true);
        $('.formErrors').html('');
        window.ga('send', {
          hitType: 'event',
          eventCategory: 'demos',
          eventAction: 'submit',
          eventLabel: 'Submit Contact Form'
        });
      },
      success: function () {
          // tracking (virtual) page views allows for funnel visualization in GA
          // vpv = virtual page view
        window.ga('set', 'page', '/vpv/demo');
        window.ga('send', 'pageview');

          // we send the event trigger also
        window.ga('send', {
          hitType: 'event',
          eventCategory: 'demos',
          eventAction: 'success',
          eventLabel: 'Contact Form Successful',
          value: 20
        });

        $('#submit-demo').html('Check your phone!');
        $('.formErrors').append('<div class="">'+
        'A concierge will be with you shortly.' +'</div>');
      },
      error: function (response) {
        window.ga('send', {
          hitType: 'event',
          eventCategory: 'demos',
          eventAction: 'error',
          eventLabel: 'Error in Contact Form'
        });
        if (response.responseJSON) {
          $.each(response.responseJSON.errors, function(event, value) {
            $('.formErrors').append('<div class="alert alert-danger">'+value+'</div>');
          });
          demoForm.find(':submit').html('Get more info').prop('disabled', false);
        } else {
          $('.formErrors').append('<div class="alert alert-danger">'+ response +'</div>');
        }
        $('#submit-demo').prop('disabled', false);
        $('#submit-demo').html('Retry');
      }
    });
  });
});
