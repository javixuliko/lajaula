function load_categories() {
    ajaxPromise('module/search/ctrl/ctrl_search.php?op=search_category', 'POST', 'JSON')
        .then(function (data) {
            $('.search_category').empty();
            $('<option>Categoria</option>').attr('selected', true).attr('disabled', true).appendTo('.search_category')
            for (row in data) {
                $('<option value="' + data[row].id_category + '">' + data[row].cat_name + '</option>').appendTo('.search_category')
            }
        }).catch(function () {
            //window.location.href = "index.php?modules=exception&op=503&error=fail_load_brands&type=503";
        });
}

function load_all_fighters() {
    $('.search_fighter').empty();
    $('<option>Peleador</option>').attr('selected', true).attr('disabled', true).appendTo('.search_fighter')
    ajaxPromise('module/search/ctrl/ctrl_search.php?op=search_all_fighters', 'POST', 'JSON')
        .then(function (data) {
            for (row in data) {
                $('<option value="' + data[row].id_fighter + '">' + data[row].fighter_name + '</option>').appendTo('.search_fighter')
            }
        }).catch(function () {});
}

function load_fighters(category) {
    $('.search_fighter').empty();
        $('<option>Peleador</option>').attr('selected', true).attr('disabled', true).appendTo('.search_fighter')
        ajaxPromise('module/search/ctrl/ctrl_search.php?op=search_fighters', 'POST', 'JSON', category)
            .then(function (data) {
                for (row in data) {
                    $('<option value="' + data[row].id_fighter + '">' + data[row].fighter_name + '</option>').appendTo('.search_fighter')
                }
            }).catch(function () {
                //window.location.href = "index.php?modules=exception&op=503&error=fail_loas_category_2&type=503";
            });
}

function launch_search() {
    load_categories();
    load_all_fighters();
    $(document).on('change', '.search_category', function () {
        let category = $(this).val();
        load_fighters({ category });
    });
}

function autocomplete() {
    $("#autocom").on("keyup", function () {
        let sdata = { complete: $(this).val() };
        if (($('.search_category').val() != 0)) {
            sdata.category = $('.search_category').val();
            if (($('.search_category').val() != 0) && ($('.search_fighter').val() != 0)) {
                sdata.fighter = $('.search_fighter').val();
            }
        }
        if (($('.search_category').val() == undefined) && ($('.search_fighter').val() != 0)) {
            sdata.fighter = $('.search_fighter').val();
        }
        ajaxPromise('module/search/ctrl/ctrl_search.php?op=autocomplete', 'POST', 'JSON', sdata)
            .then(function (data) {
                $('#search_auto').empty();
                $('#search_auto').fadeIn(10000000);
                for (row in data) {
                    $('<div></div>').appendTo('#search_auto').html(data[row].city_name).attr({ 
                        'class': 'searchElement', 
                        'id': data[row].city_name,
                        'data-id': data[row].id_city
                    });
                }
                $(document).on('click', '.searchElement', function () {
                    $('#autocom').val(this.getAttribute('id'));
                    $('#autocom_city_id').val(this.getAttribute('data-id'));
                    $('#search_auto').fadeOut(1000);
                });
                $(document).on('click scroll', function (event) {
                    if (event.target.id !== 'autocom') {
                        $('#search_auto').fadeOut(1000);
                    }
                });
            }).catch(function () {
                $('#search_auto').fadeOut(500);
            });
    });
}

function button_search() {
    $('#search-btn').on('click', function () {
        var search = [];

        var cat = $('.search_category').val();
        var catLabel = $('.search_category option:selected').text();
        var fighter = $('.search_fighter').val();
        var fighterLabel = $('.search_fighter option:selected').text();
        var city = $('#autocom').val();
        var cityId = $('#autocom_city_id').val();

        if (cat !== null && cat !== 'Categoría') {
            search.push(["categories", [cat], [catLabel]]);
        }
        if (fighter !== null && fighter !== 'Peleador') {
            search.push(["fighters", [fighter], [fighterLabel]]);
        }
        if (city !== '') {
            search.push(["cities", [cityId], [city]]);
        }

        localStorage.removeItem('filter');
        if (search.length != 0) {
            localStorage.setItem('filter', JSON.stringify(search));
        }
        window.location.href = 'index.php?page=shop';
    });
}

$(document).ready(function () {
    launch_search();
    autocomplete();
    button_search();
});