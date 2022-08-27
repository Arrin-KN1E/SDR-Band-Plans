/* globals Give*/
/**
 * Give Frontend Recurring JS
 *
 * Scripts function in frontend form.
 */
var Give_Recurring_Vars;

jQuery( document ).ready( function( $ ) {

	var doc = $( document );

	var Give_Recurring = {

		/**
		 * Initialize
		 */
		init: function() {
			/**
			 * Call notifyUserOnLevels.
			 */
			doc.on( 'give_donation_value_updated', function( e, parent_form, amount ) {

				// If event is called when field blurred.
				if ( ! parent_form ) {
					parent_form = $( this ).closest( 'form.give-form' ); // If parent form is empty, assign the current form object.
				}

					var give_total = ('undefined' === typeof amount) ? parent_form.find( 'input[name="give-amount"]' ).val() : amount,
						price_id  = parent_form.find('input[name="give-price-id"]').val(),
						give_is_donation_recurring = parent_form.find('input[name="_give_is_donation_recurring"]').data('_give_recurring'),
						give_is_price_option = parent_form.find('input[name="_give_is_donation_recurring"]').data('_give_price_option');

				// Return if donation recurring type is Donor choice.
				if( 'yes_donor' === give_is_donation_recurring || 'set' === give_is_price_option ) {
					return false;
				}

				Give_Recurring.notifyUserOnLevels( parent_form, give_total, price_id );

			} );

			/**
			 * Call notify user on gateway change.
			 */
			doc.on( 'give_gateway_loaded', function( e, response, form_id ) {

				var form = $( e.currentTarget.activeElement ).closest( 'form.give-form' );
				if ( 0 === form.length ) {
					form = $( '#' + form_id );
				}

				var amount = form.find( 'input[name="give-amount"]' ).val(),
					price_id = form.find( 'input[name="give-price-id"]' ).val(),
					give_is_donation_recurring = form.find( 'input[name="_give_is_donation_recurring"]' ).data( '_give_recurring' ),
					give_is_price_option = form.find('input[name="_give_is_donation_recurring"]').data('_give_price_option');

				// Return if donation recurring type is Donor choice.
				if ( 'yes_donor' === give_is_donation_recurring || 'set' === give_is_price_option ) {
					var recurring_period_label = form.find( '.give-recurring-period' );
					Give_Recurring.fetchRecurringPeriodText( recurring_period_label );
					return false;
				}

				var decimal = Give.form.fn.getInfo( 'decimal_separator', form );
				amount = Give.fn.unFormatCurrency( amount, decimal );

				Give_Recurring.notifyUserOnLevels( form, amount, price_id );
			} );

			Give_Recurring.confirm_subscription_cancellation();
			Give_Recurring.conditional_account_creation();

			$( '.give-recurring-period' ).on( 'click', function() {
				var $this = $( this ),
					form = $this.closest( 'form.give-form' );

				if ( $this.is( ':checked' ) ) {
					Give_Recurring.fetchRecurringPeriodText( $this );
				} else {
					form.find( '#give-recurring-modal-period-wrap' ).hide();
					form.find( '#give-recurring-modal-period' ).html( '' );
				}
			} );

			$( '.give-recurring-donors-choice-period' ).on( 'change', function() {

				Give_Recurring.fetchRecurringPeriodText( $( this ) );
			});

			// Trigger formatting function when gateway changes.
			doc.on( 'give_gateway_loaded', this.conditionalPeriodDropdown );
			doc.on( 'blur', '.give-donation-amount .give-recurring-text-input', this.edit_renewal_amount );

			Give_Recurring.conditionalPeriodDropdown();
			Give_Recurring.changeGiveIsDonationRecurring();
			Give_Recurring.update_payment_method();
		},

		/**
		 * Display Recurring Period Label in Modal PopUp.
		 *
		 * @param label Period Label.
		 * @param form Form.
		 *
		 * @since 1.5.8
		 */
		displayModalLabel: function( label, form ) {
			if ( label !== "once" && label !== "" ) {
				form.find( '#give-recurring-modal-period-wrap' ).show();
				form.find( '#give-recurring-modal-period' ).html( label.charAt(0).toUpperCase() + label.slice(1) );
			} else if ( label === "once" ) {
				form.find( '#give-recurring-modal-period-wrap' ).hide();
				form.find( '#give-recurring-modal-period' ).html( '' );
			}
		},

		/**
		 * Fetch Recurring Period Text
		 *
		 * @param $this this object.
		 *
		 * @since 1.5.8
		 */
		fetchRecurringPeriodText: function( $this ) {

			var recurringPeriod = $this.data( 'period' );
			var recurringPeriodLabel = $this.data( 'period-label' );
			var form = $this.closest( 'form.give-form' );
			var currentRecurringPeriod = form.find( '.give-recurring-donors-choice-period' ).val();
			var prettyPeriods = Give_Recurring_Vars.pretty_periods;

			if ( $this.is( 'select' ) ) {
				recurringPeriodLabel = $this.closest( 'div.give-recurring-donors-choice' )
					.find( '.give-recurring-period' )
					.data( 'period-label' );
				recurringPeriod = $this.closest( 'div.give-recurring-donors-choice' )
					.find( '.give-recurring-period' )
					.data( 'period' );
			}

			// Replace texts in label onlt if donor can change the recurring period.
			if ( currentRecurringPeriod ) {
				recurringPeriodLabel = recurringPeriodLabel.replace( new RegExp( recurringPeriod, 'g' ), currentRecurringPeriod );
				recurringPeriodLabel = recurringPeriodLabel.replace( new RegExp( prettyPeriods[ recurringPeriod ], 'g' ), prettyPeriods[ currentRecurringPeriod ] );
			}

			// Display Recurring Label if recurring is opted.
			if ( this.isRecurringOpted(form) ) {
				Give_Recurring.displayModalLabel( recurringPeriodLabel, form );
			} else {
				form.find( '#give-recurring-modal-period-wrap' ).hide();
				form.find( '#give-recurring-modal-period' ).html( '' );
			}
		},

		/**
		 * Notify users with message about the type of donation based on level.
		 *
		 * @since 1.4
		 * @since 1.8.1 Remove Ajax and Update message through JS.
		 */
		notifyUserOnLevels: function( form, amount, price_id ) {

			var data = JSON.parse( form.find( 'input[name="give_recurring_donation_details"]' ).val() );

			// Return if form is not recurring or recurring option is donor choice.
			if ( false === data.is_recurring || 'yes_donor' === data.give_recurring_option ) {
				return false;
			}

			var multi_level_message = data.multi[ price_id ].give_recurring_pretty_text,
				multi_level_lower_message = multi_level_message.toLowerCase();

			amount = Give.fn.formatCurrency( amount, {
				currency: Give.form.fn.getInfo( 'currency_code', form ),
				symbol: Give.form.fn.getInfo( 'currency_symbol', form ),
				position: Give.form.fn.getInfo( 'currency_position', form )
			}, form );

			var multi_level_message_html = Give_Recurring_Vars.multi_level_message_pre_text + ' <span class="amount">' + amount + '</span> ' + multi_level_lower_message + '.';

			form.find( '.give-recurring-multi-level-message' ).html( multi_level_message_html );

			// Update recurring hidden field with the change based on the type of donation.
			if ( 'once' !== multi_level_lower_message ) {
				form.find( '#_give_is_donation_recurring' ).val( 1 );
			} else {
				form.find( '#_give_is_donation_recurring' ).val( 0 );
			}

			// Display Modal Label when recurring is enabled.
			Give_Recurring.displayModalLabel( multi_level_message, form );
			Give_Recurring.register_checkbox( form );

		},

		changeGiveIsDonationRecurring: function () {
			$( '.give-form' ).on( 'change', '.give-recurring-donors-choice', function () {
				var give_is_donation_recurring = '0';
				var recurring_period = $( this ).find( '.give-recurring-period:checked' ).val();

				if ( 'undefined' !== typeof(
						recurring_period
					) && 'on' === recurring_period ) {
					give_is_donation_recurring = 1;
				}

				var form = $( this ).closest( 'form' );
				form.find( '._give_is_donation_recurring' ).val( give_is_donation_recurring );
				Give_Recurring.register_checkbox( form );
			} );
		},

		/**
		 * Toggle account creation fields if donor elects not to give recurring.
		 *
		 * If email access is not enabled, no guest donations are allowed.
		 * Therefore, if the donor doesn't give recurring no account is necessary.
		 */
		conditional_account_creation: function() {

			// Only w/o Email Access Enabled
			if ( Give_Recurring_Vars.email_access ) {
				return false;
			}

			// fire once donation form gateway is change.
			doc.on( 'give_gateway_loaded', function( ev, response, form_id ) {
				// Trigger float-labels
				Give_Recurring.register_checkbox( $( 'form#' + form_id ) );
			} );

			// On Page Load: When page loads loop through each form and show hide fields.
			$( 'form[id^=give-form].give-recurring-form' ).each( function () {
				Give_Recurring.register_checkbox( $( this ) );
			} );

			// Preserve Create account checkbox checked on login cancel ajax.
			$( document ).ajaxComplete( function ( event, xhr, settings ) {
				var get_action = Give_Recurring.get_parameter( 'action', settings.data );
				if ( 'give_cancel_login' === get_action ) {
					var form_id = Give_Recurring.get_parameter( 'form_id', settings.data );
					Give_Recurring.register_checkbox( $( 'form#give-form-' + form_id ) );
				}
			} );
		},

		/**
		 * Get specific parameter value from Query string.
		 *
		 * @param string parameter Parameter of query string.
		 * @param object data Set of data.
		 *
		 * @return bool
		 */
		get_parameter: function ( parameter, data ) {

			if ( ! parameter ) {
				return false;
			}

			if ( ! data ) {
				data = window.location.href;
			}

			var parameter = parameter.replace( /[\[]/, "\\\[" ).replace( /[\]]/, "\\\]" );
			var expr = parameter + "=([^&#]*)";
			var regex = new RegExp( expr );
			var results = regex.exec( data );

			if ( null !== results ) {
				return results[1];
			} else {
				return false;
			}
		},

		/**
		 * Disable Enable the register user checkbox
		 *
		 * @since 1.5.5
		 *
		 * @param form
		 */
		register_checkbox: function( form ) {

			// Only w/o Email Access Enabled
			if ( Give_Recurring_Vars.email_access ) {
				return false;
			}

			// check if guest donation is allow or not.
			var recurring_logged = form.find( '.give-logged-in-only' ).val();

			// if guest donation is not allow then return false.
			if ( 'undefined' !== typeof( recurring_logged ) && 1 === parseInt( recurring_logged ) ) {
				var is_recurring = form.find( '._give_is_donation_recurring' ).val();

				if ( 'undefined' !== typeof( is_recurring ) && 1 === parseInt( is_recurring ) ) {
					Give_Recurring.disable_register_checkbox( form );
				} else {
					Give_Recurring.enable_register_checkbox( form );
				}
			}
		},

		/**
		 * Remove the Disable checkbox option so that user can check and uncheck if s/he want to register or not
		 *
		 * @since 1.5.5
		 *
		 * @param form
		 */
		enable_register_checkbox: function ( form ) {
			var create_account_html = form.find( '[name="give_create_account"]' );
			create_account_html.removeClass( 'give-disabled' );
			create_account_html.closest( 'span' ).removeClass( 'hint--top hint--bounce' );
		},

		/**
		 * Add the Disable checkbox option so that user can not  check and uncheck if s/he want to register or not
		 *
		 * @since 1.5.5
		 *
		 * @param form
		 */
		disable_register_checkbox: function ( form ) {
			var create_account_html = form.find( '[name="give_create_account"]' );
			create_account_html.attr( 'checked', true );
			create_account_html.addClass( 'give-disabled' );
			create_account_html.closest( 'span' ).addClass( 'hint--top hint--bounce' );
		},

		/**
		 * Confirm Cancellation
		 */
		confirm_subscription_cancellation: function() {

			$( '.give-cancel-subscription' ).on( 'click touchend', function() {
				var response = confirm( Give_Recurring_Vars.messages.confirm_cancel );
				// Cancel form submit if user rejects confirmation.
				if ( response !== true ) {
					return false;
				}
			} );

		},

		/**
		 * Conditional "Period" dropdown
		 *
		 * Some gateways don't support "daily" frequency.
		 *
		 * @since 1.5
		 */
		conditionalPeriodDropdown: function( response ) {

			// Loop through selected gateways on page.
			$( '.give-gateway-option-selected' ).each( function() {

				var $form = $( this ).parents( '.give-form' ),
					gateway = $( this ).find( 'input' ).val(),
					period_select = $form.find( '.give-recurring-donors-choice-period' ),
					period = period_select.val(),
					day_option = $form.find( '.give-recurring-donors-choice-period option[value="day"]' );

				// Authorize doesn't support daily.
				if ( 'authorize' === gateway || 'razorpay' === gateway ) {

					// Only proceed if day is selected.
					if ( 'day' !== period ) {
						return;
					}

					// Disable and select next option.
					day_option.prop( 'disabled', true ).next().prop( 'selected', true );

					// Only show alert when switching gateways and not on page load.
					if ( 'undefined' !== typeof response ) {
						alert( Give_Recurring_Vars.messages.daily_forbidden );
					}

				} else {

					// Ensure that daily option is disabled.
					day_option.prop( 'disabled', false );

				}

			} );

		},

		/**
		 * Update Payment method.
		 *
		 * @since 1.7
		 */
		update_payment_method: function() {

			$( 'form[name="give-recurring-form"]' ).submit( function( e ) {
				e.preventDefault();

				// this form object.
				var this_form = $( this ),
					update_button = this_form.find( '#give-recurring-update-submit' ),
					loading_animation = this_form.find( 'input[type="submit"].give-submit + .give-loading-animation' ),
					give_payment_update_form = this_form.get( 0 ),
					complete_purchase_val = this_form.find( '#give-recurring-update-submit' ).val(),
					action = $( 'input[name="give_action"]' ).val();

				loading_animation.fadeIn();

				// HTML5 required check validity.
				if ( typeof give_payment_update_form.checkValidity === 'function' && give_payment_update_form.checkValidity() === false ) {

					// Don't leave any hanging loading animations.
					loading_animation.fadeOut();

					// Check for Safari (doesn't support HTML5 required).
					if ( (navigator.userAgent.indexOf( 'Safari' ) !== - 1 && navigator.userAgent.indexOf( 'Chrome' ) === - 1) === false ) {
						// Not safari: Support HTML5 "required" so skip the rest of this function
						return;
					}

				}

				/**
				 * Stripe payment method will only update if donor will submit form because Stripe JS SDK need to generate payment method then save it on server.
				 * This code prevent submitting form on ajax if subscription gateway is Stripe.
				 *
				 * @see https://github.com/impress-org/give-recurring/issues/998
				 */
				if(
					-1 !== Give.form.fn.getInfo('gateway', this_form ).indexOf('stripe') &&
					'recurring_update_payment' === action
				) {
					return;
				}

				// Update submit button text.
				update_button.val( give_global_vars.purchase_loading );

				// Disable the form donation button.
				update_button.attr( 'disabled', 'disabled' );

				$.ajax( {
					type: 'POST',
					url: give_global_vars.ajaxurl,
					data: this_form.serialize(),
					success: function( response ) {
						if ( response.success ) {
							loading_animation.fadeOut();
							this_form.find( '.give_errors' ).remove();
							update_button.val( complete_purchase_val );
							update_button.prop( 'disabled', false );
						}

						window.location.href = response.data.url;
					}
				} );

			} );
		},

		/**
		 * Edit renewal amount.
		 *
		 * @since 1.8
		 */
		edit_renewal_amount:function( e, $parent_form ) {
			var parent_form = ('undefined' !== typeof $parent_form) ? $parent_form : $( this ).closest( 'form' ),
				this_value = $( this ).val(),
				decimal_separator = Give.form.fn.getInfo( 'decimal_separator', parent_form ),
				value_min = Give.form.fn.getMinimumAmount( parent_form ),
				value_max = Give.form.fn.getMaximumAmount( parent_form ),
				value_now = (this_value === 0 || '' === this_value ) ? value_min : Give.fn.unFormatCurrency( this_value, decimal_separator ),
				formatted_total = Give.form.fn.formatAmount( value_now, parent_form, {} );

			$( this ).val( formatted_total );

			// Does this number have an accepted min/max value?
			if ( ! Give_Recurring.isValidRenewalAmount( parent_form ) ) {

				// It doesn't... add invalid class.
				$( this ).addClass( 'give-invalid-amount' );

				// Disable submit
				Give.form.fn.disable( parent_form, true );
				var invalid_minimum_notice = parent_form.find( '.give-invalid-minimum' ),
					invalid_maximum_notice = parent_form.find( '.give-invalid-maximum' );

				// If no error present, create it, insert, slide down (show).
				if ( 0 === invalid_minimum_notice.length && value_now < value_min ) {
					Give.notice.fn.renderNotice( 'bad_minimum', parent_form );
				} else if( value_now >= value_min ) {
					invalid_minimum_notice.slideUp( 300, function() { $( this ).remove(); } );
				}

				// For maximum custom amount error.
				if ( 0 === invalid_maximum_notice.length && value_now > value_max ) {
					Give.notice.fn.renderNotice( 'bad_maximum', parent_form );
				} else if (value_now <= value_max ){
					invalid_maximum_notice.slideUp( 300, function() { $( this ).remove(); } );
				}

			} else {

				// Remove error message class from price field.
				$( this ).removeClass( 'give-invalid-amount' );

				// Minimum amount met - slide up error & remove it from DOM.
				parent_form.find( '.give-invalid-minimum, .give-invalid-maximum' ).slideUp( 300, function() {
					$( this ).remove();
				} );

				// Re-enable submit.
				Give.form.fn.disable( parent_form, false );
			}

			// Added this trigger so that we can extend the functionality.
			doc.trigger( 'give_recurring_donation_amount_updated', [ parent_form, value_now ] );
		},

		/**
		 * Is Renewal amount valid?
		 *
		 * @since 1.8
		 *
		 * @param $form
		 * @returns {boolean}
		 */
		isValidRenewalAmount: function( $form ) {
			// Return true, if custom amount is not enabled.
			if ( $form.find( 'input[name="give-form-minimum"]' ).length <= 0 ) {
				return true;
			}

			var min_amount = Give.form.fn.getMinimumAmount( $form ),
				max_amount = Give.form.fn.getMaximumAmount( $form ),
				amount = Give.form.fn.getAmount( $form );

			// Don't allow zero donation amounts.
			if ( 0 === amount ) {
				return false;
			}

			return (
				((- 1 < amount) && amount >= min_amount && amount <= max_amount)
			);
		},

		/**
		 * Return whether or not donor opt in for subscription.
		 *
		 * @since 1.11.0
		 *
		 * @param {object} $form
		 * @return {boolean}
		 */
		isRecurringOpted: function ($form){
			var $field = $form.find( '.give-recurring-period:checked' );
			return $field &&  $field.val();
		}
	};

	Give_Recurring.init();

} );
