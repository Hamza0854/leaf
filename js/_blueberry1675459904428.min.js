var session_flyout_id = '';

$(document).ready(function() {

    $('#style_blueberry_offcanvas_custom_links').html($('#style_blueberry_top_menu').html()); //to keep header menu content to side menu for hamburger offcanvas
    $('#refine_filters_menu').html($('.blueberry_refine_search_menuboxes').html());
    $('.style_blueberry_mobile_social_links').html($('.style_blueberry_social_links').html());

    //to display offcanvas for logged in and/or out session
    $(".blueberry_header_account_icon, .blueberry_header_store_icon, .style_blueberry_language_selection_mobile").on('click', function () {

        if ( user_logged_in ) {
            session_flyout_id = 'logged_in_session_flyout';
        } else {
            session_flyout_id = 'logged_out_session_flyout';
        }
        $("#"+session_flyout_id).addClass('style_blueberry_session_flyout_display');
        $('#offcanvas_overlay, .style_blueberry_session_flyout_close').show();
        $('html').css('overflow','hidden');
    });

    $('#dealer_pricing_modal').on('hidden.bs.modal', function() { //if appleb will get shipped to iNet 5.0, reload the page in appleb too
        if ( price_mode_changed ) { //if pricing mode is changed
            location.reload(true);
        } else {
            closeFlyout();
        }
    });

});

function toggle_off_canvas_content(flyout_id, flyout_class) { //offcanvas for mobile devices onclick of hamburger and refine filter

    if (flyout_id == "offcanvas_refine_flyout" ) { //run this condition only for mobile devices
        $('.blueberry_refine_search_menuboxes').html(""); //empty the refine menuboxes of main menu for mobile devices
    }

    session_flyout_id = flyout_id;
    $("#" + flyout_id).addClass(flyout_class);
    $('#offcanvas_overlay, .style_blueberry_hamburger_flyout_close').show();
    $('html').css("overflow","hidden");
}


/*to close offcanvas onclick of close button or outside the offcanvas*/
function closeFlyout() {

    if ( session_flyout_id == 'offcanvas_refine_flyout') {
        $('.blueberry_refine_search_menuboxes').html($('#refine_filters_menu').html()); //refill back the refine menuboxes to main menu

    }
    if ( session_flyout_id == 'off_canvas_hamburger_flyout') {
        backto_main_menu();
    }
    $("#" + session_flyout_id).removeClass('style_blueberry_off_canvas_display style_blueberry_session_flyout_display');
    $('#offcanvas_overlay').hide();
    $('.style_blueberry_hamburger_flyout_close, .style_blueberry_session_flyout_close').hide();
    $('html').css("overflow","auto");
}

function select_store() { //Displays the store name options on click of store 'change'
    if (disable_ui) {
        closeFlyout();
        preventDefault();
    }
    $('.store_change_status_indicator').html($('#session_flyout_status_indicator').html());
    switch_url = sagro_base_url + "/storefront/switch.php?mode=get_store_options";
    $.get(switch_url, function(html) {
        $('.store_name_options').html(html);
        $('.change_store_link').html($('.offcanvas_store_options').html());
        $('.store_change_status_indicator').html('');
    });
}

function set_active_store() { //sets the active store for the users session
    switch_url = sagro_base_url + "/storefront/switch.php";
    serialized_data = $('#switch_store_form').serialize();

    $(".price_mode_selection, .my_profile_link, .user_info, .logout_link, .user_information_wrapper, .language_selection_wrapper, #offcanvas_login ").hide();
    $('.store_name_options').prop('disabled', true);
    $('#session_flyout_status_indicator').show();
    $('.session_flyout_status_message').text("Setting Store ... Please Wait..");
    $.post(
            switch_url,
            serialized_data, function (data) {
               location.reload(true);
            });
}

function selectJob() { //Displays the Job options on click of Job 'change'
    if (disable_ui) {
        closeFlyout();
        preventDefault();
    }
    $('#session_flyout_status_indicator').show();
     switch_url = sagro_base_url + "/storefront/switch.php?mode=get_shipto_options";
     $.get(switch_url, function(html) {
         $('.change_job_link').html($('#offcanvas_shipto_options').html());
        $('.offcanvas_shipto_options').html(html);
        $('#session_flyout_status_indicator').hide();
     });
}

function changeJob() { //sets the changed job name
    switch_url = sagro_base_url + "/storefront/switch.php";
    form_data = $('#offcanvas_switch_job_form').serialize();
    $(".price_mode_selection, .my_profile_link, .user_info, .logout_link, .language_selection_wrapper, .store_change_wrapper").hide();
    $('.offcanvas_shipto_options').prop('disabled', true);
    $('#session_flyout_status_indicator').show();
    $('.session_flyout_status_message').text("Changing Job ... Please Wait..");
    $.post( switch_url, form_data, function(data) {
        location.reload(true);
    });
}

function select_language() {
    $('.change_language').html($('.offcanvas_language_options').html());
}

function change_language() {
    $(".language_options").prop("disabled", true);
    $(".price_mode_selection, .my_profile_link, .user_info, .logout_link, .store_change_wrapper, .user_information_wrapper,  #offcanvas_login").hide();
    $('#session_flyout_status_indicator').show();
    var lang = $(".language_options option:selected").val();
    var lang_map = {} ;
    lang_map['en'] = "Changing Language ... Please Wait.." ;
    lang_map['fr'] = "Changement de langue... svp patienter";
    lang_map['es'] = "Cambiando el idioma... por favor espere..";
    var lang_options = ['en','fr','es'];
    if ( lang == '' || lang == undefined || lang_options.indexOf(lang) == -1 ) {
        lang = 'en';
    }
    $('.session_flyout_status_message').text(lang_map[lang]);
    location.href = sagro_base_url + "/util/set_language.php?language="+lang;
}

function toggle_menu_content(menubox_id) {

    $('.style_blueberry_offcanvas_sub_menu').html($("#"+menubox_id).html());
    $('.style_blueberry_offcanvas_sub_menu > div#'+menubox_id +'_style_blueberry_content').show(); //this is mainly intended to hide the content of additional levels [class->fineline]
    $('.style_blueberry_offcanvas_sub_menu > #title_bar_'+menubox_id).prop("onclick", null);
    $('.style_blueberry_offcanvas_main_menu').hide();
    $('div#backto_main_menu_'+menubox_id).show();
}

function backto_main_menu(menubox_id) {
    $('.style_blueberry_offcanvas_sub_menu > .style_blueberry_content').hide();
    $('.style_blueberry_offcanvas_sub_menu').html('');
    $('.style_blueberry_offcanvas_main_menu').show();
    $('.style_blueberry_offcanvas_backto_main_menu').hide();
}