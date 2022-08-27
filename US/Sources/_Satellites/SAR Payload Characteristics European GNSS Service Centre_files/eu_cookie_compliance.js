/**
 * @file
 * eu_cookie_compliance.js
 *
 * Defines the behavior of the eu cookie compliance banner.
 *
 * Statuses:
 *  null: not yet agreed (or withdrawn), show popup
 *  0: Disagreed
 *  1: Agreed, show thank you banner
 *  2: Agreed
 */

(function ($, Drupal, drupalSettings, cookies) {

  'use strict';
  var euCookieComplianceBlockCookies;
  var cookieValueDisagreed = (typeof drupalSettings.eu_cookie_compliance.cookie_value_disagreed === 'undefined' || drupalSettings.eu_cookie_compliance.cookie_value_disagreed === '') ? '0' : drupalSettings.eu_cookie_compliance.cookie_value_disagreed;
  var cookieValueAgreedShowThankYou = (typeof drupalSettings.eu_cookie_compliance.cookie_value_agreed_show_thank_you === 'undefined' || drupalSettings.eu_cookie_compliance.cookie_value_agreed_show_thank_you === '') ? '1' : drupalSettings.eu_cookie_compliance.cookie_value_agreed_show_thank_you;
  var cookieValueAgreed = (typeof drupalSettings.eu_cookie_compliance.cookie_value_agreed === 'undefined' || drupalSettings.eu_cookie_compliance.cookie_value_agreed === '') ? '2' : drupalSettings.eu_cookie_compliance.cookie_value_agreed;

  Drupal.behaviors.euCookieCompliancePopup = {
    attach: function (context) {
      if (typeof drupalSettings.eu_cookie_compliance !== 'undefined') {
        $(drupalSettings.eu_cookie_compliance.containing_element).once('eu-cookie-compliance').each(function () {

          // Initialize internal variables.
          _euccCurrentStatus = self.getCurrentStatus();
          _euccSelectedCategories = self.getAcceptedCategories();
          // If configured, check JSON callback to determine if in EU.
          if (drupalSettings.eu_cookie_compliance.popup_eu_only_js) {
            if (Drupal.eu_cookie_compliance.showBanner()) {
              var url = drupalSettings.path.baseUrl + drupalSettings.path.pathPrefix + 'eu-cookie-compliance-check';
              var data = {};
              $.getJSON(url, data, function (data) {
                // If in the EU, show the compliance banner.
                if (data.in_eu) {
                  Drupal.eu_cookie_compliance.execute();
                }

                // If not in EU, set an agreed cookie automatically.
                else {
                  Drupal.eu_cookie_compliance.setStatus(cookieValueAgreed);
                  // Also set all the categories as agreed if applicable, and load
                  // scripts.
                  if (drupalSettings.eu_cookie_compliance.method === 'categories') {
                    var categories = drupalSettings.eu_cookie_compliance.cookie_categories;
                    Drupal.eu_cookie_compliance.setAcceptedCategories(categories);
                    Drupal.eu_cookie_compliance.loadCategoryScripts(categories);
                  }
                }
              });
            }
          }

          // Otherwise, fallback to standard behavior which is to render the banner.
          else {
            Drupal.eu_cookie_compliance.execute();
          }
          $(this).addClass('eu-cookie-compliance-status-' + Drupal.eu_cookie_compliance.getCurrentStatus());
        });
      }
    },
  };

  // Set up the namespace as a function to store list of arguments in a queue.
  Drupal.eu_cookie_compliance = Drupal.eu_cookie_compliance || function () {
    (Drupal.eu_cookie_compliance.queue = Drupal.eu_cookie_compliance.queue || []).push(arguments)
  };
  // Initialize the object with some data.
  Drupal.eu_cookie_compliance.a = +new Date;
  // A shorter name to use when accessing the namespace.
  var self = Drupal.eu_cookie_compliance;
  // Save our cookie preferences locally only.
  // Used by external scripts to modify data before it is used.
  var _euccSelectedCategories = [];
  var _euccCurrentStatus = null;
  self.updateSelectedCategories = function (categories) {
    _euccSelectedCategories = categories;
  }
  self.updateCurrentStatus = function (status) {
    _euccCurrentStatus = status;
  }

  Drupal.eu_cookie_compliance.execute = function () {
    try {
      if (!drupalSettings.eu_cookie_compliance.popup_enabled) {
        return;
      }

      if (!Drupal.eu_cookie_compliance.cookiesEnabled()) {
        return;
      }

      Drupal.eu_cookie_compliance.getCurrentStatus();

      if (typeof Drupal.eu_cookie_compliance.getVersion() === 'undefined') {
        // If version doesn't exist as a cookie, set it to the current one.
        // For modules that update to this, it prevents needless retriggering
        // For first time runs, it makes no difference as the other IF statements
        // below will still cause the popup to trigger
        // For incrementing the version, it also makes no difference as either it's
        // a returning user and will have a version set, or it's a new user and
        // the other checks will trigger it.
        Drupal.eu_cookie_compliance.setVersion();
      }

      var versionChanged = Drupal.eu_cookie_compliance.getVersion() !== drupalSettings.eu_cookie_compliance.cookie_policy_version;

      // Closed if status has a value and the version hasn't changed or user has not agreed.
      var closed = !drupalSettings.eu_cookie_compliance.open_by_default ||
        (_euccCurrentStatus !== null && (!versionChanged || !Drupal.eu_cookie_compliance.hasAgreed()));

      // Only worried about OPT_IN / GDPR method at present for the perm. settings tab.
      if (_euccCurrentStatus == 0 && drupalSettings.eu_cookie_compliance.settings_tab_enabled && drupalSettings.eu_cookie_compliance.method === 'opt_in' && !versionChanged) {
         Drupal.eu_cookie_compliance.createPopup(drupalSettings.eu_cookie_compliance.popup_html_info, (_euccCurrentStatus !== null));
         $('.eu-cookie-withdraw-tab').click(Drupal.eu_cookie_compliance.toggleWithdrawBanner);
         Drupal.eu_cookie_compliance.attachAgreeEvents();
      }
      else if ((_euccCurrentStatus === 0 && drupalSettings.eu_cookie_compliance.method === 'default') || _euccCurrentStatus === null || (_euccCurrentStatus !== 1 && drupalSettings.eu_cookie_compliance.withdraw_enabled && drupalSettings.eu_cookie_compliance.withdraw_button_on_info_popup) || (_euccCurrentStatus !== 1 && versionChanged)) {
        if (drupalSettings.eu_cookie_compliance.withdraw_enabled || !drupalSettings.eu_cookie_compliance.disagree_do_not_show_popup || _euccCurrentStatus === null) {
          // Detect mobile here and use mobile_popup_html_info, if we have a mobile device.
          if (window.matchMedia('(max-width: ' + drupalSettings.eu_cookie_compliance.mobile_breakpoint + 'px)').matches && drupalSettings.eu_cookie_compliance.use_mobile_message) {
            Drupal.eu_cookie_compliance.createPopup(drupalSettings.eu_cookie_compliance.mobile_popup_html_info, closed);
          }
          else {
            Drupal.eu_cookie_compliance.createPopup(drupalSettings.eu_cookie_compliance.popup_html_info, closed);
          }
          Drupal.eu_cookie_compliance.initPopup();
          Drupal.eu_cookie_compliance.resizeListener();
        }
      }
      else if (_euccCurrentStatus === 1 && drupalSettings.eu_cookie_compliance.popup_agreed_enabled) {
        // Thank you banner.
        Drupal.eu_cookie_compliance.createPopup(drupalSettings.eu_cookie_compliance.popup_html_agreed);
        Drupal.eu_cookie_compliance.attachHideEvents();
      }
      else if (_euccCurrentStatus === 2 && drupalSettings.eu_cookie_compliance.withdraw_enabled) {
        if (!drupalSettings.eu_cookie_compliance.withdraw_button_on_info_popup) {
          Drupal.eu_cookie_compliance.createWithdrawBanner(drupalSettings.eu_cookie_compliance.withdraw_markup);
          Drupal.eu_cookie_compliance.initPopup();
          Drupal.eu_cookie_compliance.resizeListener();
        }
      }
    }
    catch (e) {
    }
  };

  Drupal.eu_cookie_compliance.initPopup = function () {
    Drupal.eu_cookie_compliance.attachAgreeEvents();

    if (drupalSettings.eu_cookie_compliance.method === 'categories') {
      Drupal.eu_cookie_compliance.setPreferenceCheckboxes(_euccSelectedCategories);
      Drupal.eu_cookie_compliance.attachSavePreferencesEvents();
    }

    if (drupalSettings.eu_cookie_compliance.withdraw_enabled) {
      Drupal.eu_cookie_compliance.attachWithdrawEvents();
      if (_euccCurrentStatus === 1 || _euccCurrentStatus === 2) {
        $('.eu-cookie-withdraw-button').show();
      }
    }
  }

  Drupal.eu_cookie_compliance.positionTab = function () {
    if (drupalSettings.eu_cookie_compliance.popup_position) {
      var totalHeight = $('.eu-cookie-withdraw-tab').outerHeight() + $('.eu-cookie-compliance-banner').outerHeight();
      $('.eu-cookie-withdraw-tab').css('margin-top', totalHeight + 'px');
    }
  };

  Drupal.eu_cookie_compliance.createWithdrawBanner = function (html) {
    var $html = $('<div></div>').html(html);
    var $banner = $('.eu-cookie-withdraw-banner', $html);
    $html.attr({
      'id': 'sliding-popup',
      'role': 'banner',
      'aria-describedby': 'popup-text',
    });
    $html.addClass('eu-cookie-withdraw-wrapper');

    if (!drupalSettings.eu_cookie_compliance.popup_use_bare_css) {
      $banner.height(drupalSettings.eu_cookie_compliance.popup_height)
          .width(drupalSettings.eu_cookie_compliance.popup_width);
    }
    $html.hide();
    var height = 0;
    if (drupalSettings.eu_cookie_compliance.popup_position) {
      $html.prependTo(drupalSettings.eu_cookie_compliance.containing_element);
      height = $html.outerHeight();

      $html.show()
          .addClass('sliding-popup-top')
          .addClass('clearfix')
        .css({ top: !drupalSettings.eu_cookie_compliance.fixed_top_position ? -(parseInt($(drupalSettings.eu_cookie_compliance.containing_element).css('padding-top')) + parseInt($(drupalSettings.eu_cookie_compliance.containing_element).css('margin-top')) + height) : -1 * height });
      // For some reason, the tab outerHeight is -10 if we don't use a timeout
      // function to reveal the tab.
      setTimeout(function () {
        var height = $html.outerHeight();

        $html.animate({ top: !drupalSettings.eu_cookie_compliance.fixed_top_position ? -(parseInt($(drupalSettings.eu_cookie_compliance.containing_element).css('padding-top')) + parseInt($(drupalSettings.eu_cookie_compliance.containing_element).css('margin-top')) + height) : -1 * height }, drupalSettings.eu_cookie_compliance.popup_delay, null, function () {
          $html.trigger('eu_cookie_compliance_popup_open');
          $('body').addClass('eu-cookie-compliance-popup-open');
          Drupal.eu_cookie_compliance.positionTab();
        });
      }.bind($html), 0);
    }
    else {
      if (drupalSettings.eu_cookie_compliance.better_support_for_screen_readers) {
        $html.prependTo(drupalSettings.eu_cookie_compliance.containing_element);
      }
      else {
        $html.appendTo(drupalSettings.eu_cookie_compliance.containing_element);
      }
      height = $html.outerHeight();
      $html.show()
          .addClass('sliding-popup-bottom')
          .css({ bottom: -1 * height });
      // For some reason, the tab outerHeight is -10 if we don't use a timeout
      // function to reveal the tab.
      setTimeout(function () {
        var height = $html.outerHeight();

        $html.animate({ bottom: -1 * (height) }, drupalSettings.eu_cookie_compliance.popup_delay, null, function () {
          $html.trigger('eu_cookie_compliance_popup_open');
          $('body').addClass('eu-cookie-compliance-popup-open');
        });
      }.bind($html), 0);
    }
  };

  Drupal.eu_cookie_compliance.toggleWithdrawBanner = function () {
    var $wrapper = $('#sliding-popup');
    var height = $wrapper.outerHeight();
    var bannerIsShowing = ($wrapper.find('.eu-cookie-compliance-banner, .eu-cookie-withdraw-banner').is(':visible'));
    if (bannerIsShowing) {
      bannerIsShowing = drupalSettings.eu_cookie_compliance.popup_position ? parseInt($wrapper.css('top')) === (!drupalSettings.eu_cookie_compliance.fixed_top_position ? -(parseInt($(drupalSettings.eu_cookie_compliance.containing_element).css('padding-top')) + parseInt($(drupalSettings.eu_cookie_compliance.containing_element).css('margin-top'))) : 0) : parseInt($wrapper.css('bottom')) === 0;
    }
    if (drupalSettings.eu_cookie_compliance.popup_position) {
      if (bannerIsShowing) {
        $wrapper.animate({ top: !drupalSettings.eu_cookie_compliance.fixed_top_position ? -(parseInt($(drupalSettings.eu_cookie_compliance.containing_element).css('padding-top')) + parseInt($(drupalSettings.eu_cookie_compliance.containing_element).css('margin-top')) + height) : -1 * height }, drupalSettings.eu_cookie_compliance.popup_delay).trigger('eu_cookie_compliance_popup_close');
        $('body').removeClass('eu-cookie-compliance-popup-open');
      }
      else {
        // If "Do not show cookie policy when the user clicks the Cookie policy button." is
        // selected, the inner banner may be hidden.
        $wrapper.find('.eu-cookie-compliance-banner').show();
        $wrapper.animate({ top: !drupalSettings.eu_cookie_compliance.fixed_top_position ? -(parseInt($(drupalSettings.eu_cookie_compliance.containing_element).css('padding-top')) + parseInt($(drupalSettings.eu_cookie_compliance.containing_element).css('margin-top'))) : 0 }, drupalSettings.eu_cookie_compliance.popup_delay).trigger('eu_cookie_compliance_popup_open');
        $('body').addClass('eu-cookie-compliance-popup-open');
      }
    }
    else {
      if (bannerIsShowing) {
        $wrapper.animate({ 'bottom': -1 * (height) }, drupalSettings.eu_cookie_compliance.popup_delay).trigger('eu_cookie_compliance_popup_close');
        $('body').removeClass('eu-cookie-compliance-popup-open');
      }
      else {
        // If "Do not show cookie policy when the user clicks the Cookie policy button." is
        // selected, the inner banner may be hidden.
        $wrapper.find('.eu-cookie-compliance-banner').show();
        $wrapper.animate({ 'bottom': 0 }, drupalSettings.eu_cookie_compliance.popup_delay).trigger('eu_cookie_compliance_popup_open');
        $('body').addClass('eu-cookie-compliance-popup-open');
      }
    }
  };

  Drupal.eu_cookie_compliance.resizeListener = function () {
    var $wrapper = $('#sliding-popup');

    var debounce = function (func, wait) {
      var timeout;

      return function executedFunction() {
        var later = function () {
          clearTimeout(timeout);
          func();
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    };

    var checkIfPopupIsClosed = debounce(function () {
      var wrapperHeight = $wrapper.outerHeight();
      if (drupalSettings.eu_cookie_compliance.popup_position) {
        var wrapperTopProperty = parseFloat($wrapper.css('top'));
        if (wrapperTopProperty < 0 && wrapperTopProperty > -wrapperHeight) {
          $wrapper.css('top', wrapperHeight * -1);
        }
      }
      else {
        var wrapperBottomProperty = parseFloat($wrapper.css('bottom'));
        if (wrapperBottomProperty !== 0) {
          $wrapper.css('bottom', wrapperHeight * -1);
        }
      }
    }, 50);

    setTimeout(function () {
      checkIfPopupIsClosed();
    });

    window.addEventListener('resize', checkIfPopupIsClosed);
  };

  Drupal.eu_cookie_compliance.createPopup = function (html, closed) {
    // This fixes a problem with jQuery 1.9.
    var popup = $('<div></div>').html(html);
    popup.attr({
      'id': 'sliding-popup',
      'role': 'banner',
      'aria-describedby': 'popup-text',
    });
    if (!drupalSettings.eu_cookie_compliance.popup_use_bare_css) {
      popup.height(drupalSettings.eu_cookie_compliance.popup_height)
          .width(drupalSettings.eu_cookie_compliance.popup_width);
    }

    popup.hide();
    var height = 0;
    if (drupalSettings.eu_cookie_compliance.popup_position) {
      popup.prependTo(drupalSettings.eu_cookie_compliance.containing_element);
      height = popup.outerHeight();
      popup.show()
        .addClass('sliding-popup-top clearfix')
        .css({ top: -1 * height });

      if (closed !== true) {
        popup.animate({top: 0}, drupalSettings.eu_cookie_compliance.popup_delay, null, function () {
          popup.trigger('eu_cookie_compliance_popup_open');
          $('body').addClass('eu-cookie-compliance-popup-open');
          Drupal.eu_cookie_compliance.positionTab();
        });
      }
      else {
        setTimeout(function () {
          Drupal.eu_cookie_compliance.positionTab();
        }, 0);
      }
    }
    else {
      if (drupalSettings.eu_cookie_compliance.better_support_for_screen_readers) {
        popup.prependTo(drupalSettings.eu_cookie_compliance.containing_element);
      }
      else {
        popup.appendTo(drupalSettings.eu_cookie_compliance.containing_element);
      }

      height = popup.outerHeight();
      popup.show()
        .addClass('sliding-popup-bottom')
        .css({bottom: -1 * height});

      if (closed !== true) {
        popup.animate({bottom: 0}, drupalSettings.eu_cookie_compliance.popup_delay, null, function () {
          popup.trigger('eu_cookie_compliance_popup_open');
          $('body').addClass('eu-cookie-compliance-popup-open');
        });
      }
    }
  };

  Drupal.eu_cookie_compliance.attachAgreeEvents = function () {
    var clickingConfirms = drupalSettings.eu_cookie_compliance.popup_clicking_confirmation;
    var scrollConfirms = drupalSettings.eu_cookie_compliance.popup_scrolling_confirmation;

    if (drupalSettings.eu_cookie_compliance.method === 'categories' && drupalSettings.eu_cookie_compliance.enable_save_preferences_button) {
        // The agree button becomes an agree to all categories button when the 'save preferences' button is present.
        $('.agree-button').click(Drupal.eu_cookie_compliance.acceptAllAction);
    }
    else {
        $('.agree-button').click(Drupal.eu_cookie_compliance.acceptAction);
    }
    $('.decline-button').click(Drupal.eu_cookie_compliance.declineAction);

    if (clickingConfirms) {
      $('a, input[type=submit], button[type=submit]').not('.popup-content *').bind('click.euCookieCompliance', Drupal.eu_cookie_compliance.acceptAction);
    }

    if (scrollConfirms) {
      var alreadyScrolled = false;
      var scrollHandler = function () {
        if (alreadyScrolled) {
          Drupal.eu_cookie_compliance.acceptAction();
          $(window).off('scroll', scrollHandler);
        }
        else {
          alreadyScrolled = true;
        }
      };

      $(window).bind('scroll', scrollHandler);
    }

    $('.find-more-button').not('.find-more-button-processed').addClass('find-more-button-processed').click(Drupal.eu_cookie_compliance.moreInfoAction);
  };

  Drupal.eu_cookie_compliance.attachSavePreferencesEvents = function () {
    $('.eu-cookie-compliance-save-preferences-button').click(Drupal.eu_cookie_compliance.savePreferencesAction);
  };

  Drupal.eu_cookie_compliance.attachHideEvents = function () {
    var popupHideAgreed = drupalSettings.eu_cookie_compliance.popup_hide_agreed;
    var clickingConfirms = drupalSettings.eu_cookie_compliance.popup_clicking_confirmation;
    $('.hide-popup-button').click(function () {
          Drupal.eu_cookie_compliance.changeStatus(cookieValueAgreed);
        }
    );
    if (clickingConfirms) {
      $('a, input[type=submit], button[type=submit]').unbind('click.euCookieCompliance');
    }

    if (popupHideAgreed) {
      $('a, input[type=submit], button[type=submit]').bind('click.euCookieComplianceHideAgreed', function () {
        Drupal.eu_cookie_compliance.changeStatus(cookieValueAgreed);
      });
    }

    $('.find-more-button').not('.find-more-button-processed').addClass('find-more-button-processed').click(Drupal.eu_cookie_compliance.moreInfoAction);
  };

  Drupal.eu_cookie_compliance.attachWithdrawEvents = function () {
    $('.eu-cookie-withdraw-button').click(Drupal.eu_cookie_compliance.withdrawAction);
    $('.eu-cookie-withdraw-tab').click(Drupal.eu_cookie_compliance.toggleWithdrawBanner);
  };

  Drupal.eu_cookie_compliance.acceptAction = function () {
    var agreedEnabled = drupalSettings.eu_cookie_compliance.popup_agreed_enabled;
    var nextStatus = cookieValueAgreedShowThankYou;
    if (!agreedEnabled) {
      Drupal.eu_cookie_compliance.setStatus(cookieValueAgreedShowThankYou);
      nextStatus = cookieValueAgreed;
    }

    if (!euCookieComplianceHasLoadedScripts && typeof euCookieComplianceLoadScripts === "function") {
      euCookieComplianceLoadScripts();
    }

    if (typeof euCookieComplianceBlockCookies !== 'undefined') {
      clearInterval(euCookieComplianceBlockCookies);
    }

    if (drupalSettings.eu_cookie_compliance.method === 'categories') {
      // Select Checked categories.
      var categories = $("#eu-cookie-compliance-categories input:checkbox:checked").map(function () {
        return $(this).val();
      }).get();
      Drupal.eu_cookie_compliance.setAcceptedCategories(categories);
      // Load scripts for all categories. If no categories selected, none
      // will be loaded.
      Drupal.eu_cookie_compliance.loadCategoryScripts(categories);
      if (!categories.length) {
        // No categories selected is the same as declining all cookies.
        nextStatus = cookieValueDisagreed;
      }
    }

    Drupal.eu_cookie_compliance.changeStatus(nextStatus);

    if (drupalSettings.eu_cookie_compliance.withdraw_enabled && drupalSettings.eu_cookie_compliance.withdraw_button_on_info_popup) {
      Drupal.eu_cookie_compliance.attachWithdrawEvents();
      if (_euccCurrentStatus === 1 || _euccCurrentStatus === 2) {
        $('.eu-cookie-withdraw-button').show();
      }
    }
  };

  Drupal.eu_cookie_compliance.acceptAllAction = function () {
    var allCategories = drupalSettings.eu_cookie_compliance.cookie_categories;
    Drupal.eu_cookie_compliance.setPreferenceCheckboxes(allCategories);
    Drupal.eu_cookie_compliance.acceptAction();
  }

  Drupal.eu_cookie_compliance.savePreferencesAction = function () {
    var categories = $("#eu-cookie-compliance-categories input:checkbox:checked").map(function () {
      return $(this).val();
    }).get();
    var agreedEnabled = drupalSettings.eu_cookie_compliance.popup_agreed_enabled;
    var nextStatus = cookieValueAgreedShowThankYou;
    if (!agreedEnabled) {
      Drupal.eu_cookie_compliance.setStatus(cookieValueAgreedShowThankYou);
      nextStatus = cookieValueAgreed;
    }

    Drupal.eu_cookie_compliance.setAcceptedCategories(categories);
    // Load scripts for all categories. If no categories selected, none
    // will be loaded.
    Drupal.eu_cookie_compliance.loadCategoryScripts(categories);
    if (!categories.length) {
      // No categories selected is the same as declining all cookies.
      nextStatus = cookieValueDisagreed;
    }

    Drupal.eu_cookie_compliance.changeStatus(nextStatus);
  };

  Drupal.eu_cookie_compliance.loadCategoryScripts = function (categories) {
    for (var cat in categories) {
      if (euCookieComplianceHasLoadedScriptsForCategory[cat] !== true && typeof euCookieComplianceLoadScripts === "function") {
        euCookieComplianceLoadScripts(categories[cat]);
        euCookieComplianceHasLoadedScriptsForCategory[cat] = true;
      }
    }
  }

  Drupal.eu_cookie_compliance.declineAction = function () {
    var set_cookie_session_zero_on_disagree = parseInt(drupalSettings.eu_cookie_compliance.set_cookie_session_zero_on_disagree);
    if (set_cookie_session_zero_on_disagree) {
      drupalSettings.eu_cookie_compliance.cookie_session = 1;
    }
    Drupal.eu_cookie_compliance.setStatus(cookieValueDisagreed);
    var popup = $('#sliding-popup');
    if (popup.hasClass('sliding-popup-top')) {
      if (drupalSettings.eu_cookie_compliance.settings_tab_enabled) {
        popup.animate({top: !drupalSettings.eu_cookie_compliance.fixed_top_position ? -(parseInt($(drupalSettings.eu_cookie_compliance.containing_element).css('padding-top')) + parseInt($(drupalSettings.eu_cookie_compliance.containing_element).css('margin-top')) + popup.outerHeight()) : popup.outerHeight() * -1}, drupalSettings.eu_cookie_compliance.popup_delay, null).trigger('eu_cookie_compliance_popup_close');
        $('.eu-cookie-withdraw-tab').click(Drupal.eu_cookie_compliance.toggleWithdrawBanner);
      }
      else {
        popup.animate({top: !drupalSettings.eu_cookie_compliance.fixed_top_position ? -(parseInt($(drupalSettings.eu_cookie_compliance.containing_element).css('padding-top')) + parseInt($(drupalSettings.eu_cookie_compliance.containing_element).css('margin-top')) + popup.outerHeight()) : popup.outerHeight() * -1}, drupalSettings.eu_cookie_compliance.popup_delay, null, function () {
          popup.hide();
        }).trigger('eu_cookie_compliance_popup_close');
        $('body').removeClass('eu-cookie-compliance-popup-open');
      }
    }
    else {
      if (drupalSettings.eu_cookie_compliance.settings_tab_enabled) {
        popup.animate({ bottom: popup.outerHeight() * -1 }, drupalSettings.eu_cookie_compliance.popup_delay, null).trigger('eu_cookie_compliance_popup_close');
        $('.eu-cookie-withdraw-tab').click(Drupal.eu_cookie_compliance.toggleWithdrawBanner);
      }
      else {
        popup.animate({ bottom: popup.outerHeight() * -1 }, drupalSettings.eu_cookie_compliance.popup_delay, null, function () {
          popup.hide();
        }).trigger('eu_cookie_compliance_popup_close');
        $('body').removeClass('eu-cookie-compliance-popup-open');
      }
    }
  };

  Drupal.eu_cookie_compliance.withdrawAction = function () {
    var set_cookie_session_zero_on_disagree = parseInt(drupalSettings.eu_cookie_compliance.set_cookie_session_zero_on_disagree);
    if (set_cookie_session_zero_on_disagree) {
      drupalSettings.eu_cookie_compliance.cookie_session = 1;
    }
    Drupal.eu_cookie_compliance.setStatus(null);
    Drupal.eu_cookie_compliance.setAcceptedCategories([]);
    location.reload();
  };

  Drupal.eu_cookie_compliance.moreInfoAction = function () {
    if (drupalSettings.eu_cookie_compliance.disagree_do_not_show_popup) {
      Drupal.eu_cookie_compliance.setStatus(cookieValueDisagreed);
      if (drupalSettings.eu_cookie_compliance.withdraw_enabled && drupalSettings.eu_cookie_compliance.withdraw_button_on_info_popup) {
        $('#sliding-popup .eu-cookie-compliance-banner').trigger('eu_cookie_compliance_popup_close').hide();
        $('body').removeClass('eu-cookie-compliance-popup-open');
      }
      else {
        $('#sliding-popup').trigger('eu_cookie_compliance_popup_close').remove();
        $('body').removeClass('eu-cookie-compliance-popup-open');
      }
    }
    else {
      if (drupalSettings.eu_cookie_compliance.popup_link_new_window) {
        window.open(drupalSettings.eu_cookie_compliance.popup_link);
      }
      else {
        window.location.href = drupalSettings.eu_cookie_compliance.popup_link;
      }
    }
  };

  Drupal.eu_cookie_compliance.getCookieStatus = function () {
    var cookieName = (typeof drupalSettings.eu_cookie_compliance.cookie_name === 'undefined' || drupalSettings.eu_cookie_compliance.cookie_name === '') ? 'cookie-agreed' : drupalSettings.eu_cookie_compliance.cookie_name;
    var numericalStatus = null;
    if (cookies.get(cookieName) === cookieValueDisagreed) {
      numericalStatus = '0';
    } else if (cookies.get(cookieName) === cookieValueAgreedShowThankYou) {
      numericalStatus = '1';
    } else if (cookies.get(cookieName) === cookieValueAgreed) {
      numericalStatus = '2';
    }
    var storedStatus = numericalStatus;
    var currentStatus = parseInt(storedStatus);
    if (isNaN(currentStatus)) {
      currentStatus = null;
    }
    return currentStatus;
  }

  Drupal.eu_cookie_compliance.getCurrentStatus = function () {
    // Make a new observer & fire it to allow other scripts to hook in.
    var preStatusLoadObject = new PreStatusLoad();
    self.handleEvent('preStatusLoad', preStatusLoadObject);

    _euccCurrentStatus = Drupal.eu_cookie_compliance.getCookieStatus();

    // Make a new observer & fire it to allow other scripts to hook in.
    var postStatusLoadObject = new PostStatusLoad();
    self.handleEvent('postStatusLoad', postStatusLoadObject);

    return _euccCurrentStatus;
  };

  Drupal.eu_cookie_compliance.setPreferenceCheckboxes = function (categories) {
    if ((categories.length && Drupal.eu_cookie_compliance.getCookieStatus() !== null) || Drupal.eu_cookie_compliance.getCookieStatus() === 0) {
      // Unset all categories to prevent a problem where the checkboxes with a
      // default state set would always show up as checked.
      $("#eu-cookie-compliance-categories input:checkbox").removeAttr("checked");
    }
    // Check the appropriate checkboxes.
    for (var i in categories) {
      var categoryElement = document.getElementById('cookie-category-' + categories[i]);
      if (categoryElement !== null) {
        categoryElement.checked = true;
      }
    }
  }

  Drupal.eu_cookie_compliance.getAcceptedCategories = function () {
    // Make a new observer & fire it to allow other scripts to hook in.
    var prePreferencesLoadObject = new PrePreferencesLoad();
    self.handleEvent('prePreferencesLoad', prePreferencesLoadObject);

    var cookieName = (typeof drupalSettings.eu_cookie_compliance.cookie_name === 'undefined' || drupalSettings.eu_cookie_compliance.cookie_name === '') ? 'cookie-agreed-categories' : drupalSettings.eu_cookie_compliance.cookie_name + '-categories';
    var storedCategories = cookies.get(cookieName);

    if (storedCategories !== null && typeof storedCategories !== 'undefined') {
      // JS cookie introduced unescaped cookie values.
      if (storedCategories.indexOf('%') !== -1) {
        storedCategories = decodeURI(storedCategories).replace('%2C', ',');
      }
      _euccSelectedCategories = JSON.parse(storedCategories);
    }
    else {
      _euccSelectedCategories = [];
    }

    // Merge in required categories if not already present. Mimics old
    // logic where "fix first category" changed logic in
    // .hasAgreedWithCategory and this function.
    for (var _categoryName in drupalSettings.eu_cookie_compliance.cookie_categories_details) {
      var _category = drupalSettings.eu_cookie_compliance.cookie_categories_details[_categoryName];
      if (_category.checkbox_default_state === 'required' && $.inArray(_category.id, _euccSelectedCategories) === -1) {
        _euccSelectedCategories.push(_category.id);
      }
    }

    // Make a new observer & fire it to allow other scripts to hook in.
    var postPreferencesLoadObject = new PostPreferencesLoad();
    self.handleEvent('postPreferencesLoad', postPreferencesLoadObject);

    return _euccSelectedCategories;
  };

  Drupal.eu_cookie_compliance.changeStatus = function (value) {
    var reloadPage = drupalSettings.eu_cookie_compliance.reload_page;
    var previousState = _euccCurrentStatus;
    if (_euccCurrentStatus === parseInt(value)) {
      return;
    }

    if (drupalSettings.eu_cookie_compliance.popup_position) {
      $('.sliding-popup-top').animate({ top: !drupalSettings.eu_cookie_compliance.fixed_top_position ? -(parseInt($(drupalSettings.eu_cookie_compliance.containing_element).css('padding-top')) + parseInt($(drupalSettings.eu_cookie_compliance.containing_element).css('margin-top')) + $('#sliding-popup').outerHeight()) : $('#sliding-popup').outerHeight() * -1 }, drupalSettings.eu_cookie_compliance.popup_delay, function () {
        if (value === cookieValueAgreedShowThankYou && previousState === null && !reloadPage) {
          $('.sliding-popup-top').not('.eu-cookie-withdraw-wrapper').html(drupalSettings.eu_cookie_compliance.popup_html_agreed).animate({ top: !drupalSettings.eu_cookie_compliance.fixed_top_position ? -(parseInt($(drupalSettings.eu_cookie_compliance.containing_element).css('padding-top')) + parseInt($(drupalSettings.eu_cookie_compliance.containing_element).css('margin-top'))) : 0 }, drupalSettings.eu_cookie_compliance.popup_delay);
          Drupal.eu_cookie_compliance.attachHideEvents();
        }
        else if (previousState === cookieValueAgreedShowThankYou) {
          if (drupalSettings.eu_cookie_compliance.withdraw_enabled && drupalSettings.eu_cookie_compliance.withdraw_button_on_info_popup) {
            // Restore popup content.
            if (window.matchMedia('(max-width: ' + drupalSettings.eu_cookie_compliance.mobile_breakpoint + 'px)').matches && drupalSettings.eu_cookie_compliance.use_mobile_message) {
              $('.sliding-popup-top').not('.eu-cookie-withdraw-wrapper').html(drupalSettings.eu_cookie_compliance.mobile_popup_html_info);
            }
            else {
              $('.sliding-popup-top').not('.eu-cookie-withdraw-wrapper').html(drupalSettings.eu_cookie_compliance.popup_html_info);
            }
            Drupal.eu_cookie_compliance.initPopup();
            Drupal.eu_cookie_compliance.resizeListener();
          }
          else {
            $('.sliding-popup-top').not('.eu-cookie-withdraw-wrapper').trigger('eu_cookie_compliance_popup_close').remove();
          }
        }
        if (drupalSettings.eu_cookie_compliance.withdraw_enabled) {
          Drupal.eu_cookie_compliance.showWithdrawBanner(value);
        }
      });
    }
    else {
      $('.sliding-popup-bottom').animate({ bottom: $('#sliding-popup').outerHeight() * -1 }, drupalSettings.eu_cookie_compliance.popup_delay, function () {
        if (value === cookieValueAgreedShowThankYou && previousState === null && !reloadPage) {
          $('.sliding-popup-bottom').not('.eu-cookie-withdraw-wrapper').html(drupalSettings.eu_cookie_compliance.popup_html_agreed).animate({ bottom: 0 }, drupalSettings.eu_cookie_compliance.popup_delay);
          Drupal.eu_cookie_compliance.attachHideEvents();
        }
        else if (previousState === cookieValueAgreedShowThankYou) {
          if (drupalSettings.eu_cookie_compliance.withdraw_enabled && drupalSettings.eu_cookie_compliance.withdraw_button_on_info_popup) {
            // Restore popup content.
            if (window.matchMedia('(max-width: ' + drupalSettings.eu_cookie_compliance.mobile_breakpoint + 'px)').matches && drupalSettings.eu_cookie_compliance.use_mobile_message) {
              $('.sliding-popup-bottom').not('.eu-cookie-withdraw-wrapper').html(drupalSettings.eu_cookie_compliance.mobile_popup_html_info);
            }
            else {
              $('.sliding-popup-bottom').not('.eu-cookie-withdraw-wrapper').html(drupalSettings.eu_cookie_compliance.popup_html_info);
            }
            Drupal.eu_cookie_compliance.initPopup();
            Drupal.eu_cookie_compliance.resizeListener();
          }
          else {
            $('.sliding-popup-bottom').not('.eu-cookie-withdraw-wrapper').trigger('eu_cookie_compliance_popup_close').remove();
            $('body').removeClass('eu-cookie-compliance-popup-open');
          }
        }
        if (drupalSettings.eu_cookie_compliance.withdraw_enabled) {
          Drupal.eu_cookie_compliance.showWithdrawBanner(value);
        }
      });
    }

    if (drupalSettings.eu_cookie_compliance.reload_page) {
      var reloadRoutesList;
      // Checks if there's any route on the settings.
      if ((reloadRoutesList = drupalSettings.eu_cookie_compliance.reload_routes_list).length !== 0) {
        var currentPath = drupalSettings.path.currentPath;
        var match = false;

        // If there are routes specified on the settings, it checks if any of
        // it matches with the current path.
        for (var n = 0; !match && n < reloadRoutesList.length; n++) {
          var regExp = new RegExp(reloadRoutesList[n], "g");
          match = currentPath.match(regExp) !== null;
        }

        /*
         * It will reload the page whether if the current path matches with one of the specified routes and the
         * reload_options setting is set to "Include", which indicates that all matches should reload; OR if
         * there's no match and the reload_options settings is set to "Exclude", which indicates that if the
         * current path doesn't match with one of the specified routes, it should be reloaded.
         */
        if ((match && !drupalSettings.eu_cookie_compliance.reload_options) || (!match && drupalSettings.eu_cookie_compliance.reload_options)) {
          location.reload();
        }
      }
      // If no routes specified, then the page will be always reloaded.
      else {
        location.reload();
      }
    }

    Drupal.eu_cookie_compliance.setStatus(value);
  };

  Drupal.eu_cookie_compliance.showWithdrawBanner = function (value) {
    if (value === cookieValueAgreed && drupalSettings.eu_cookie_compliance.withdraw_enabled) {
      if (!drupalSettings.eu_cookie_compliance.withdraw_button_on_info_popup) {
        Drupal.eu_cookie_compliance.createWithdrawBanner(drupalSettings.eu_cookie_compliance.withdraw_markup);
        Drupal.eu_cookie_compliance.resizeListener();
      }
      Drupal.eu_cookie_compliance.attachWithdrawEvents();
      Drupal.eu_cookie_compliance.positionTab();
    }
  };

  Drupal.eu_cookie_compliance.setStatus = function (status) {
    // Make a new observer & fire it to allow other scripts to hook in.
    var preStatusSaveObject = new PreStatusSave();
    self.handleEvent('preStatusSave', preStatusSaveObject);

    var date = new Date();
    var domain = drupalSettings.eu_cookie_compliance.domain ? drupalSettings.eu_cookie_compliance.domain : '';
    var path = drupalSettings.eu_cookie_compliance.domain_all_sites ? '/' : drupalSettings.path.baseUrl;
    var cookieName = (typeof drupalSettings.eu_cookie_compliance.cookie_name === 'undefined' || drupalSettings.eu_cookie_compliance.cookie_name === '') ? 'cookie-agreed' : drupalSettings.eu_cookie_compliance.cookie_name;
    if (path.length > 1) {
      var pathEnd = path.length - 1;
      if (path.lastIndexOf('/') === pathEnd) {
        path = path.substring(0, pathEnd);
      }
    }

    var cookie_session = parseInt(drupalSettings.eu_cookie_compliance.cookie_session);
    if (cookie_session) {
      cookies.set(cookieName, status, { path: path, domain: domain, sameSite: 'strict' });
    }
    else {
      var lifetime = parseInt(drupalSettings.eu_cookie_compliance.cookie_lifetime);
      date.setDate(date.getDate() + lifetime);
      cookies.set(cookieName, status, { expires: date, path: path, domain: domain, sameSite: 'strict' });
    }
    _euccCurrentStatus = status;
    $(document).trigger('eu_cookie_compliance.changeStatus', [status]);
    // Status set means something happened, update the version.
    Drupal.eu_cookie_compliance.setVersion();

    // Store consent if applicable.
    if (drupalSettings.eu_cookie_compliance.store_consent && ((status === cookieValueAgreedShowThankYou && drupalSettings.eu_cookie_compliance.popup_agreed_enabled) || (status === cookieValueAgreed  && !drupalSettings.eu_cookie_compliance.popup_agreed_enabled))) {
      var url = drupalSettings.path.baseUrl + drupalSettings.path.pathPrefix + 'eu-cookie-compliance/store_consent/banner';
      $.post(url, {}, function (data) { });
    }

    // Make a new observer & fire it to allow other scripts to hook in.
    var postStatusSaveObject = new PostStatusSave();
    self.handleEvent('postStatusSave', postStatusSaveObject);

    if (status === cookieValueDisagreed && drupalSettings.eu_cookie_compliance.method === 'opt_out') {
      euCookieComplianceBlockCookies = setInterval(Drupal.eu_cookie_compliance.BlockCookies, 5000);
    }
  };

  Drupal.eu_cookie_compliance.setAcceptedCategories = function (categories) {
    // Make a new observer & fire it to allow other scripts to hook in.
    var prePreferencesSaveObject = new PrePreferencesSave();
    self.handleEvent('prePreferencesSave', prePreferencesSaveObject);

    var date = new Date();
    var domain = drupalSettings.eu_cookie_compliance.domain ? drupalSettings.eu_cookie_compliance.domain : '';
    var path = drupalSettings.eu_cookie_compliance.domain_all_sites ? '/' : drupalSettings.path.baseUrl;
    var cookieName = (typeof drupalSettings.eu_cookie_compliance.cookie_name === 'undefined' || drupalSettings.eu_cookie_compliance.cookie_name === '') ? 'cookie-agreed-categories' : drupalSettings.eu_cookie_compliance.cookie_name + '-categories';
    if (path.length > 1) {
      var pathEnd = path.length - 1;
      if (path.lastIndexOf('/') === pathEnd) {
        path = path.substring(0, pathEnd);
      }
    }
    var categoriesString = JSON.stringify(categories);
    var cookie_session = parseInt(drupalSettings.eu_cookie_compliance.cookie_session);
    if (cookie_session) {
      cookies.set(cookieName, categoriesString, { path: path, domain: domain, sameSite: 'strict' });
    }
    else {
      var lifetime = parseInt(drupalSettings.eu_cookie_compliance.cookie_lifetime);
      date.setDate(date.getDate() + lifetime);
      cookies.set(cookieName, categoriesString, { expires: date, path: path, domain: domain, sameSite: 'strict' });
    }
    _euccSelectedCategories = categories;
    $(document).trigger('eu_cookie_compliance.changePreferences', [categories]);

    // TODO: Store categories with consent if applicable?
    // Make a new observer & fire it to allow other scripts to hook in.
    var postPreferencesSaveObject = new PostPreferencesSave();
    self.handleEvent('postPreferencesSave', postPreferencesSaveObject);
  };

  Drupal.eu_cookie_compliance.hasAgreed = function (category) {
    var agreed = (_euccCurrentStatus === 1 || _euccCurrentStatus === 2);

    if (category !== undefined && agreed) {
      agreed = Drupal.eu_cookie_compliance.hasAgreedWithCategory(category);
    }

    return agreed;
  };

  Drupal.eu_cookie_compliance.hasAgreedWithCategory = function (category) {
    return $.inArray(category, _euccSelectedCategories) !== -1;
  };

  Drupal.eu_cookie_compliance.showBanner = function () {
    var showBanner = false;
    if ((_euccCurrentStatus === 0 && drupalSettings.eu_cookie_compliance.method === 'default') || _euccCurrentStatus === null) {
      if (!drupalSettings.eu_cookie_compliance.disagree_do_not_show_popup || _euccCurrentStatus === null) {
        showBanner = true;
      }
    }
    else if (_euccCurrentStatus === 1 && drupalSettings.eu_cookie_compliance.popup_agreed_enabled) {
      showBanner = true;
    }
    else if (_euccCurrentStatus === 2 && drupalSettings.eu_cookie_compliance.withdraw_enabled) {
      showBanner = true;
    }

    return showBanner;
  };

  Drupal.eu_cookie_compliance.cookiesEnabled = function () {
    var cookieEnabled = (navigator.cookieEnabled);
    if (typeof navigator.cookieEnabled === 'undefined' && !cookieEnabled) {
      cookies.set('testcookie', 'testcookie', { expires: 100, sameSite: 'strict' });
      cookieEnabled = (cookies.get('testcookie').indexOf('testcookie') !== -1);
    }

    return (cookieEnabled);
  };

  Drupal.eu_cookie_compliance.cookieMatches = function (cookieName, pattern) {
    if (cookieName === pattern) {
      return true;
    }
    if (pattern.indexOf('*') < 0) {
      return false;
    }
    try {
      var regexp = new RegExp('^' + pattern.replace(/\./g, '\\.').replace(/\*/g, '.+') + '$', 'g');
      return regexp.test(cookieName);
    }
    catch (err) {
      return false;
    }
  };

  Drupal.eu_cookie_compliance.isAllowed = function (cookieName) {
    // Skip the PHP session cookie.
    if (cookieName.indexOf('SESS') === 0 || cookieName.indexOf('SSESS') === 0) {
      return true;
    }
    // Split the allowed cookies.
    var euCookieComplianceAllowlist = drupalSettings.eu_cookie_compliance.allowed_cookies.split(/\r\n|\n|\r/g);

    // Add the EU Cookie Compliance cookie.
    euCookieComplianceAllowlist.push((typeof drupalSettings.eu_cookie_compliance.cookie_name === 'undefined' || drupalSettings.eu_cookie_compliance.cookie_name === '') ? 'cookie-agreed' : drupalSettings.eu_cookie_compliance.cookie_name);
    euCookieComplianceAllowlist.push((typeof drupalSettings.eu_cookie_compliance.cookie_name === 'undefined' || drupalSettings.eu_cookie_compliance.cookie_name === '') ? 'cookie-agreed-categories' : drupalSettings.eu_cookie_compliance.cookie_name + '-categories');
    euCookieComplianceAllowlist.push((typeof drupalSettings.eu_cookie_compliance.cookie_name === 'undefined' || drupalSettings.eu_cookie_compliance.cookie_name === '') ? 'cookie-agreed-version' : drupalSettings.eu_cookie_compliance.cookie_name + '-version');
    // Check if the cookie is allowed.
    for (var item in euCookieComplianceAllowlist) {
      // Defensively check types for comparison.
      if (typeof euCookieComplianceAllowlist[item] === "string") {
        if (Drupal.eu_cookie_compliance.cookieMatches(cookieName, euCookieComplianceAllowlist[item])) {
          return true;
        }
        // Handle cookie names that are prefixed with a category.
        if (drupalSettings.eu_cookie_compliance.method === 'categories') {
          var separatorPos = euCookieComplianceAllowlist[item].indexOf(":");
          if (separatorPos !== -1) {
            var category = euCookieComplianceAllowlist[item].substr(0, separatorPos);
            var wlCookieName = euCookieComplianceAllowlist[item].substr(separatorPos + 1);

            if (Drupal.eu_cookie_compliance.cookieMatches(cookieName, wlCookieName) && Drupal.eu_cookie_compliance.hasAgreedWithCategory(category)) {
              return true;
            }
          }
        }
      }
    }

    return false;
  }

  Drupal.eu_cookie_compliance.getVersion = function () {
    // Only get cookie-agreed-version version cookie, if user agreed.
    if (!Drupal.eu_cookie_compliance.hasAgreed()) {
      return false;
    }

    var cookieName = (typeof drupalSettings.eu_cookie_compliance.cookie_name === 'undefined' || drupalSettings.eu_cookie_compliance.cookie_name === '') ? 'cookie-agreed-version' : drupalSettings.eu_cookie_compliance.cookie_name + '-version';
    return cookies.get(cookieName);
  };

  Drupal.eu_cookie_compliance.setVersion = function () {
    // Only set cookie-agreed-version version cookie, if user agreed.
    if (!Drupal.eu_cookie_compliance.hasAgreed()) {
      return false;
    }

    var date = new Date();
    var domain = drupalSettings.eu_cookie_compliance.domain ? drupalSettings.eu_cookie_compliance.domain : '';
    var path = drupalSettings.eu_cookie_compliance.domain_all_sites ? '/' : drupalSettings.path.baseUrl;
    var cookieName = (typeof drupalSettings.eu_cookie_compliance.cookie_name === 'undefined' || drupalSettings.eu_cookie_compliance.cookie_name === '') ? 'cookie-agreed-version' : drupalSettings.eu_cookie_compliance.cookie_name + '-version';
    if (path.length > 1) {
      var pathEnd = path.length - 1;
      if (path.lastIndexOf('/') === pathEnd) {
        path = path.substring(0, pathEnd);
      }
    }

    var eucc_version = drupalSettings.eu_cookie_compliance.cookie_policy_version;
    var cookie_session = parseInt(drupalSettings.eu_cookie_compliance.cookie_session);
    if (cookie_session) {
      cookies.set(cookieName, eucc_version, { path: path, domain: domain, sameSite: 'strict' });
    }
    else {
      var lifetime = parseInt(drupalSettings.eu_cookie_compliance.cookie_lifetime);
      date.setDate(date.getDate() + lifetime);
      cookies.set(cookieName, eucc_version, { expires: date, path: path, domain: domain, sameSite: 'strict' });
    }
  };

  // Load blocked scripts if the user has agreed to being tracked.
  var euCookieComplianceHasLoadedScripts = false;
  var euCookieComplianceHasLoadedScriptsForCategory = [];
  $(function () {
    if (typeof drupalSettings.eu_cookie_compliance !== 'undefined') {
      if (Drupal.eu_cookie_compliance.hasAgreed()
        || (_euccCurrentStatus === null && drupalSettings.eu_cookie_compliance.method !== 'opt_in' && drupalSettings.eu_cookie_compliance.method !== 'categories')
      ) {
        if (typeof euCookieComplianceLoadScripts === "function") {
          euCookieComplianceLoadScripts();
        }
        euCookieComplianceHasLoadedScripts = true;

        if (drupalSettings.eu_cookie_compliance.method === 'categories') {
          Drupal.eu_cookie_compliance.loadCategoryScripts(_euccSelectedCategories);
        }
      }
    }
  });

  Drupal.eu_cookie_compliance.BlockCookies = function () {
    var cookieStatus = Drupal.eu_cookie_compliance.getCookieStatus();
    if ((cookieStatus === 1 || cookieStatus === 2)
      && drupalSettings.eu_cookie_compliance.method !== 'categories') {
      // Stop blocking the cookies if it's already been agreed to (e.g. in a different tab).
      if (typeof euCookieComplianceBlockCookies !== 'undefined') {
        clearInterval(euCookieComplianceBlockCookies);
        return;
      }
    }
    // Load all cookies from jQuery.
    var allCookies = cookies.get();

    // Check each cookie and try to remove it if it's not allowed.
    for (var i in allCookies) {
      var remove = true;
      var hostname = window.location.hostname;
      var cookieRemoved = false;
      var index = 0;

      remove = !Drupal.eu_cookie_compliance.isAllowed(i);

      // Remove the cookie if it's not allowed.
      if (remove) {
        while (!cookieRemoved && hostname !== '') {
          // Attempt to remove.
          cookies.remove(i, { domain: '.' + hostname, path: '/' });
          cookieRemoved = !cookies.get(i);
          if (!cookieRemoved) {
            cookies.remove(i, { domain: hostname, path: '/' });
            cookieRemoved = !cookies.get(i);
          }

          index = hostname.indexOf('.');

          // We can be on a sub-domain, so keep checking the main domain as well.
          hostname = (index === -1) ? '' : hostname.substring(index + 1);
        }

        // Some jQuery Cookie versions don't remove cookies well.  Try again
        // using plain js.
        if (!cookieRemoved) {
          document.cookie = i + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;';
        }
      }
    }
  }

  // Block cookies when the user hasn't agreed.
  if ((typeof drupalSettings.eu_cookie_compliance !== 'undefined') &&
    drupalSettings.eu_cookie_compliance.automatic_cookies_removal &&
    (
      (drupalSettings.eu_cookie_compliance.method === 'opt_in' && (_euccCurrentStatus === null  || !Drupal.eu_cookie_compliance.hasAgreed()))
      || (drupalSettings.eu_cookie_compliance.method === 'opt_out' && !Drupal.eu_cookie_compliance.hasAgreed() && _euccCurrentStatus !== null)
      || (drupalSettings.eu_cookie_compliance.method === 'categories')
    )) {
    euCookieComplianceBlockCookies = setInterval(Drupal.eu_cookie_compliance.BlockCookies, 5000);
  }

  /**
   * Filter the event listeners by event name and return the list of handlers.
   *
   * @param forEventName
   *
   * @returns {[]}
   */
  var filterQueue = function (forEventName) {
    var handlers = [];
    if (typeof Drupal.eu_cookie_compliance !== 'undefined' &&
        typeof Drupal.eu_cookie_compliance.queue !== 'undefined' &&
        Drupal.eu_cookie_compliance.queue.length) {
      // Loop over the list of arguments (objects) pushed into the queue.
      for (var i = 0; i < Drupal.eu_cookie_compliance.queue.length; i++) {
        if (Drupal.eu_cookie_compliance.queue[i].length) {
          var queueItem = Drupal.eu_cookie_compliance.queue[i];
          var eventName = queueItem[0];
          var eventHandler = queueItem[1];
          // If the first element is a string and the second is a function.
          if (typeof eventName === 'string' && typeof eventHandler === 'function') {
            // And the string matches the event name.
            if (eventName === forEventName) {
              // Return the functions so they can be executed.
              handlers.push(eventHandler);
            }
          }
        }
      }
    }
    return handlers;
  }

  /**
   * Handle event by finding and executing handlers pushed to the queue.
   */
  self.handleEvent = function (eventName, observer) {
    var handlers = filterQueue(eventName);
    for (var i = 0; i < handlers.length; i++) {
      if (typeof handlers[i] !== 'undefined') {
        observer.subscribe(handlers[i]);
        observer.fire({
          currentStatus: _euccCurrentStatus,
          currentCategories: _euccSelectedCategories
        });
        observer.unsubscribe(handlers[i]);
      }
    }
  };

  /**
   * Observer: triggered before status gets read from cookie.
   */
  var PreStatusLoad = (function () {
    // Constructor.
    var PreStatusLoad = function () {
      // Observers.
      this.handlers = [];
    };
    // Convenience var for the prototype.
    var prototype = PreStatusLoad.prototype;
    prototype.subscribe = function (fn) {
      this.handlers.push(fn);
    };
    prototype.unsubscribe = function (fn) {
      this.handlers = this.handlers.filter(
          function (item) {
            if (item !== fn) {
              return item;
            }
          }
      );
    };
    prototype.fire = function (o, thisObj) {
      var scope = thisObj || window;
      this.handlers.forEach(function (item) {
        item.call(scope, o);
      });
    };
    return PreStatusLoad;
  })();

  /**
   * Observer: when status was read from cookie and stored in private variable.
   */
  var PostStatusLoad = (function () {
    // Constructor.
    var PostStatusLoad = function () {
      // Observers.
      this.handlers = [];
    };
    // Convenience var for the prototype.
    var prototype = PostStatusLoad.prototype;
    prototype.subscribe = function (fn) {
      this.handlers.push(fn);
    };
    prototype.unsubscribe = function (fn) {
      this.handlers = this.handlers.filter(
          function (item) {
            if (item !== fn) {
              return item;
            }
          }
      );
    };
    prototype.fire = function (o, thisObj) {
      var scope = thisObj || window;
      this.handlers.forEach(function (item) {
        item.call(scope, o);
      });
    };
    return PostStatusLoad;
  })();

  /**
   * Observer: triggered before status gets saved into cookie.
   */
  var PreStatusSave = (function () {
    // Constructor.
    var PreStatusSave = function () {
      // Observers.
      this.handlers = [];
    };
    // Convenience var for the prototype.
    var prototype = PreStatusSave.prototype;
    prototype.subscribe = function (fn) {
      this.handlers.push(fn);
    };
    prototype.unsubscribe = function (fn) {
      this.handlers = this.handlers.filter(
          function (item) {
            if (item !== fn) {
              return item;
            }
          }
      );
    };
    prototype.fire = function (o, thisObj) {
      var scope = thisObj || window;
      this.handlers.forEach(function (item) {
        item.call(scope, o);
      });
    };
    return PreStatusSave;
  })();

  /**
   * Observer: triggered after status was saved into cookie.
   */
  var PostStatusSave = (function () {
    // Constructor.
    var PostStatusSave = function () {
      // Observers.
      this.handlers = [];
    };
    // Convenience var for the prototype.
    var prototype = PostStatusSave.prototype;
    prototype.subscribe = function (fn) {
      this.handlers.push(fn);
    };
    prototype.unsubscribe = function (fn) {
      this.handlers = this.handlers.filter(
          function (item) {
            if (item !== fn) {
              return item;
            }
          }
      );
    };
    prototype.fire = function (o, thisObj) {
      var scope = thisObj || window;
      this.handlers.forEach(function (item) {
        item.call(scope, o);
      });
    };
    return PostStatusSave;
  })();

  /**
   * Observer: triggered before categories are read from cookie.
   */
  var PrePreferencesLoad = (function () {
    // Constructor.
    var prePreferencesLoad = function () {
      // Observers.
      this.handlers = [];
    };
    // Convenience var for the prototype.
    var prototype = prePreferencesLoad.prototype;
    prototype.subscribe = function (fn) {
      this.handlers.push(fn);
    };
    prototype.unsubscribe = function (fn) {
      this.handlers = this.handlers.filter(
          function (item) {
            if (item !== fn) {
              return item;
            }
          }
      );
    };
    prototype.fire = function (o, thisObj) {
      var scope = thisObj || window;
      this.handlers.forEach(function (item) {
        item.call(scope, o);
      });
    };
    return prePreferencesLoad;
  })();

  /**
   * Observer: triggered after categories were read from cookie.
   */
  var PostPreferencesLoad = (function () {
    // Constructor.
    var postPreferencesLoad = function () {
      // Observers.
      this.handlers = [];
    };
    // Convenience var for the prototype.
    var prototype = postPreferencesLoad.prototype;
    prototype.subscribe = function (fn) {
      this.handlers.push(fn);
    };
    prototype.unsubscribe = function (fn) {
      this.handlers = this.handlers.filter(
          function (item) {
            if (item !== fn) {
              return item;
            }
          }
      );
    };
    prototype.fire = function (o, thisObj) {
      var scope = thisObj || window;
      this.handlers.forEach(function (item) {
        item.call(scope, o);
      });
    };
    return postPreferencesLoad;
  })();

  /**
   * Observer: triggered before categories are being saved to cookie.
   */
  var PrePreferencesSave = (function () {
    // Constructor.
    var prePreferencesSave = function () {
      // Observers.
      this.handlers = [];
    };
    // Convenience var for the prototype.
    var prototype = prePreferencesSave.prototype;
    prototype.subscribe = function (fn) {
      this.handlers.push(fn);
    };
    prototype.unsubscribe = function (fn) {
      this.handlers = this.handlers.filter(
          function (item) {
            if (item !== fn) {
              return item;
            }
          }
      );
    };
    prototype.fire = function (o, thisObj) {
      var scope = thisObj || window;
      this.handlers.forEach(function (item) {
        item.call(scope, o);
      });
    };
    return prePreferencesSave;
  })();

  /**
   * Observer: triggered after categories were saved to cookie.
   */
  var PostPreferencesSave = (function () {
    // Constructor.
    var postPreferencesSave = function () {
      // Observers.
      this.handlers = [];
    };
    // Convenience var for the prototype.
    var prototype = postPreferencesSave.prototype;
    prototype.subscribe = function (fn) {
      this.handlers.push(fn);
    };
    prototype.unsubscribe = function (fn) {
      this.handlers = this.handlers.filter(
          function (item) {
            if (item !== fn) {
              return item;
            }
          }
      );
    };
    prototype.fire = function (o, thisObj) {
      var scope = thisObj || window;
      this.handlers.forEach(function (item) {
        item.call(scope, o);
      });
    };
    return postPreferencesSave;
  })();

})(jQuery, Drupal, drupalSettings, window.Cookies);
