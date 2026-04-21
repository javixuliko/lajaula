function loadEventos() {
    $('#section-hero').show();
    $('#section-main').show();
    $('#details-shop').hide();
    var filtro = JSON.parse(localStorage.getItem('filter'));

    if (filtro && filtro.length > 0) {
        ajaxForSearch("module/shop/ctrl/ctrl_shop.php?op=filter", filtro);
        restoreAllFilters();
        renderActiveChips(filtro);
    } else {
        ajaxForSearch("module/shop/ctrl/ctrl_shop.php?op=all_eventos");
    }

    var pendingId = localStorage.getItem('pendingEventDetail');
    if (pendingId) {
        localStorage.removeItem('pendingEventDetail');
        setTimeout(function() {
            loadDetails(pendingId);
        }, 300);
    }
}

function ajaxForSearch(url, filter) {
    ajaxPromise(url, 'POST', 'JSON', { 'filter': filter })
        .then(function(data) {
            console.log(data);
            $('#content_shop_eventos').empty();
            $('.date_evento').empty();
            $('.date_img').empty();
            $('.date_evento_dentro').empty();

            if (data == "error") {
                $('<div></div>').appendTo('#content_shop_eventos')
                    .html('<h3>¡No se encuentran resultados con los filtros aplicados!</h3>')
            } else {
                for (row in data) {
                    const { id_event, images, org_name, event_name, event_date, venue_name, city_name, base_price } = data[row];
                    const swiperId = `swiper-event-${id_event}`;
                    
                    $('<div></div>').attr({ 'id': id_event, 'class': 'list_content_shop' }).appendTo('#content_shop_eventos')
                        .html(`
                            <div class='bg-neutral-900 border border-primary/10 rounded-xl overflow-hidden hover:border-primary/40 transition-all group cursor-pointer'>
                                <div class="swiper ${swiperId}" style="height:200px">
                                    <div class="swiper-wrapper">
                                        ${images.map(img => `
                                            <div class="swiper-slide">
                                                <img src="${img}" class="w-full h-full object-cover" style="height:200px"/>
                                            </div>
                                        `).join('')}
                                    </div>
                                    <div class="swiper-button-next"></div>
                                    <div class="swiper-button-prev"></div>
                                    <div class="swiper-pagination"></div>
                                </div>
                                <span class='absolute top-3 left-3 bg-primary text-white text-xs font-bold px-2 py-1 rounded uppercase z-10'>${org_name}</span>
                                <div class='p-5'>
                                    <h3 class='text-white font-black text-lg uppercase italic leading-tight mb-3'>${event_name}</h3>
                                    <div class='space-y-1 mb-4'>
                                        <p class='text-slate-400 text-sm flex items-center gap-2'><span class='material-symbols-outlined text-primary text-sm'>calendar_month</span>${event_date}</p>
                                        <p class='text-slate-400 text-sm flex items-center gap-2'><span class='material-symbols-outlined text-primary text-sm'>location_on</span>${venue_name}, ${city_name}</p>
                                    </div>
                                    <div class='flex items-center justify-between pt-3 border-t border-primary/10'>
                                        <span class='text-primary font-black text-xl'>${base_price}€</span>
                                        <button id='${id_event}' class='more_info_list bg-primary hover:bg-red-700 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all'>Ver más</button>
                                    </div>
                                </div>
                            </div>
                        `)
                }
            }
            setTimeout(function() {
                for (row in data) {
                    const { id_event } = data[row];
                    const swiperId = `swiper-event-${id_event}`;
                    new Swiper(`.${swiperId}`, {
                        loop: true,
                        pagination: {
                            el: `.${swiperId} .swiper-pagination`,
                            clickable: true
                        },
                        navigation: {
                            nextEl: `.${swiperId} .swiper-button-next`,
                            prevEl: `.${swiperId} .swiper-button-prev`
                        }
                    });
                }
            }, 50);
            mapBox_all(data);
        }).catch(function() {
            //window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Function ajxForSearch SHOP";
            console.log("error");
        });
}

function clicks() {
    $(document).on("click", ".more_info_list", function() {
        var id_event = this.getAttribute('id');
        loadDetails(id_event);
    });
}

var swiperInstance = null;

function loadDetails(id_event) {
    ajaxPromise(`module/shop/ctrl/ctrl_shop.php?op=details_eventos&id=${id_event}`, 'GET', 'JSON')
    .then(function(data) {

        $('#container-date-img').html(`
            <div class="swiper swiper-details" style="width:100%; height:680px;">
                <div class="swiper-wrapper" id="swiper-details-wrapper"></div>

                <div class="swiper-button-next"></div>
                <div class="swiper-button-prev"></div>
                <div class="swiper-pagination"></div>
            </div>
        `);

        $('#container-date-img').prepend(`
            <div style="position:absolute; top:18px; left:18px; z-index:30;">
                <button onclick="loadEventos()" class="back-btn-shop">
                    <span class="material-symbols-outlined back-arrow">arrow_back</span>
                    Volver a Eventos
                </button>
            </div>
        `);

        $('.date_evento').empty();

        const { org_name, event_name, event_date, venue_name, city_name, country, tickets_available, main_event, description, base_price } = data[0];

        // Insertar imágenes en el Swiper
        for (row in data[1]) {
            const { image_url } = data[1][row];
            $('#swiper-details-wrapper').append(`
                <div class="swiper-slide">
                    <img src="${image_url}" style="width:100%; height:680px; object-fit:cover;"/>
                </div>
            `);
        }


        // Info del evento
        $('.date_evento').append(`
            <div class="w-full" style="background-color:#150808; color:#ffdad5;">

                <!-- Hero Section -->
                <section class="relative w-full min-h-[60vh] overflow-hidden flex flex-col justify-end">
                    <div class="absolute inset-0 z-0" style="background: linear-gradient(to top, #150808 0%, rgba(21,8,8,0.8) 50%, transparent 100%), linear-gradient(to right, rgba(21,8,8,0.9), transparent); background-color:#2a1414;"></div>
                    <div class="relative z-10 max-w-7xl mx-auto px-6 pb-16 pt-16 w-full">
                        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
                            <div class="lg:col-span-8 space-y-6">
                                <div class="inline-flex items-center gap-4">
                                    <span class="bg-primary text-white text-sm font-black px-4 py-1.5 rounded-sm tracking-[0.3em] uppercase">MAIN EVENT</span>
                                    <span class="text-primary font-black tracking-widest uppercase italic text-lg">${org_name}</span>
                                </div>
                                <div class="space-y-2">
                                    <h2 class="text-6xl md:text-8xl font-black italic tracking-tighter text-white uppercase leading-[0.85] drop-shadow-2xl" style="text-shadow:0 0 20px rgba(242,13,13,0.4)">
                                        ${main_event.replace(' VS ', '<br/><span style="color:#f20d0d">VS</span> ')}
                                    </h2>
                                    <h3 class="text-xl font-black text-slate-300 uppercase italic tracking-tight border-l-4 border-primary pl-4">
                                        ${event_name}
                                    </h3>
                                </div>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 text-slate-300">
                                    <div class="space-y-3">
                                        <h4 class="font-black uppercase italic tracking-widest text-sm" style="color:#f20d0d">Sobre el Evento</h4>
                                        <p class="text-base leading-relaxed font-medium">${description}</p>
                                    </div>
                                    <div class="space-y-3">
                                        <h4 class="font-black uppercase italic tracking-widest text-sm" style="color:#f20d0d">Detalles</h4>
                                        <ul class="space-y-2">
                                            <li class="flex items-start gap-2">
                                                <span class="material-symbols-outlined text-lg" style="color:#f20d0d">calendar_month</span>
                                                <span class="text-sm font-bold uppercase">${event_date}</span>
                                            </li>
                                            <li class="flex items-start gap-2">
                                                <span class="material-symbols-outlined text-lg" style="color:#f20d0d">location_on</span>
                                                <span class="text-sm font-bold uppercase">${venue_name}, ${city_name}</span>
                                            </li>
                                            <li class="flex items-start gap-2">
                                                <span class="material-symbols-outlined text-lg" style="color:#f20d0d">confirmation_number</span>
                                                <span class="text-sm font-bold uppercase">${tickets_available} entradas disponibles</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="flex flex-col sm:flex-row gap-4 pt-4">
                                    <button class="text-white font-black py-5 px-12 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-2xl uppercase tracking-widest text-lg" style="background-color:#f20d0d">
                                        Comprar Entradas
                                    </button>
                                    <button class="font-black py-5 px-12 rounded-xl transition-all uppercase tracking-widest text-lg text-white" style="background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2)">
                                        Añadir al Carrito
                                    </button>
                                </div>
                            </div>
                            <!-- Card lateral -->
                            <div class="lg:col-span-4 hidden lg:block">
                                <div class="p-8 rounded-2xl space-y-6" style="background:rgba(0,0,0,0.4); border:1px solid rgba(255,255,255,0.1)">
                                    <div class="flex items-center gap-4" style="color:#f20d0d">
                                        <span class="material-symbols-outlined text-3xl">schedule</span>
                                        <div>
                                            <p class="text-xs font-black uppercase tracking-widest text-slate-400">Fecha del evento</p>
                                            <p class="text-xl font-black italic uppercase text-white">${event_date}</p>
                                        </div>
                                    </div>
                                    <div class="flex items-center gap-4 text-white">
                                        <span class="material-symbols-outlined text-3xl">location_on</span>
                                        <div>
                                            <p class="text-xs font-black uppercase tracking-widest text-slate-400">Recinto</p>
                                            <p class="text-sm font-bold">${venue_name}, ${city_name}, ${country}</p>
                                        </div>
                                    </div>
                                    <div class="pt-4" style="border-top:1px solid rgba(255,255,255,0.1)">
                                        <p class="text-xs font-black uppercase tracking-widest mb-2" style="color:#5f3f3a">Precio desde</p>
                                        <p class="text-4xl font-black" style="color:#f20d0d">${base_price}€</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Location & Amenities -->
                <section class="max-w-7xl mx-auto px-6 mt-16 pb-20 grid grid-cols-1 lg:grid-cols-5 gap-8">
                    <div class="lg:col-span-3 space-y-6">
                        <div class="rounded-2xl overflow-hidden" style="background-color:#2a1414; border:1px solid rgba(242,13,13,0.1)">
                            <div class="p-6 flex items-center justify-between" style="border-bottom:1px solid rgba(242,13,13,0.1)">
                                <div class="flex items-center gap-3">
                                    <span class="material-symbols-outlined" style="color:#f20d0d">explore</span>
                                    <h4 class="text-xs font-black tracking-widest text-slate-100 uppercase italic">Localización del Recinto</h4>
                                </div>
                            </div>
                            <div id="map-detail" style="height:300px; width:100%;"></div>
                        </div>
                    </div>
                    <!-- Amenities -->
                    <div class="lg:col-span-2">
                        <div class="rounded-2xl p-8 h-full flex flex-col" style="background-color:#2a1414; border:1px solid rgba(242,13,13,0.1)">
                            <div class="flex items-center gap-3 mb-8 pb-4" style="border-bottom:1px solid rgba(242,13,13,0.1)">
                                <span class="material-symbols-outlined" style="color:#f20d0d">auto_awesome</span>
                                <h4 class="text-xs font-black tracking-widest text-slate-100 uppercase italic">Extras</h4>
                            </div>
                            <div id="extras-list" class="space-y-6"></div>
                        </div>
                    </div>
                </section>

            </div>
        `);

        const extras = data[2] || [];
        if (extras.length === 0) {
            $('#extras-list').append(`<p class="text-slate-500 text-sm italic">Sin extras disponibles.</p>`);
        } else {
            extras.forEach(function(extra) {
                $('#extras-list').append(`
                    <div class="flex items-center gap-5 group">
                        <div class="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:bg-primary"
                            style="background:rgba(255,0,0,0.1); border:1px solid rgba(242,13,13,0.2)">
                            <img src="${extra.icon}" alt="${extra.name}"
                                class="w-6 h-6 group-hover:brightness-0 group-hover:invert"
                                style="filter: invert(18%) sepia(96%) saturate(7494%) hue-rotate(358deg) brightness(96%) contrast(114%)"/>
                        </div>
                        <div>
                            <p class="text-sm font-black text-white uppercase tracking-wider italic">${extra.name}</p>
                        </div>
                    </div>
                `);
            });
        }

        // Mostrar sección
        $('#section-hero').hide();
        $('#section-main').hide();
        $('#details-shop').show();

        setTimeout(() => {
            new Swiper('.swiper-details', {
                loop: true,
                autoplay: {
                    delay: 2500,
                    disableOnInteraction: false
                },
                speed: 600,
                navigation: {
                    nextEl: '.swiper-details .swiper-button-next',
                    prevEl: '.swiper-details .swiper-button-prev'
                },
                pagination: {
                    el: '.swiper-details .swiper-pagination',
                    clickable: true
                }
            });

            window.scrollTo({ top: 0, behavior: 'smooth' });
            data[0].images = data[1].map(img => img.image_url);
            mapBox(data[0]);
        }, 50);
    }).catch(function() {
        // window.location.href = "...";
    });
}

/* function highlight(filter) {
    if (filter != 0) {
        $('.highlight').empty();
        $('<div style="display: inline; float: right;"></div>').appendTo('.highlight')
            .html('<p style="display: inline; margin:10px;">Sus filtros: </p>');
        for (row in filter) {
            $('<div style="display: inline; float: right;"></div>').appendTo('.highlight')
                .html('<p style="display: inline; margin:3px;">' + filter[row] + '</p>');
        }
    }
    else {
        $('.highlight').empty();
        location.reload();
    }
} */

function print_filters() {
    if ($('.div-filters').length > 0) return;

    $('<div class="div-filters space-y-4"></div>').appendTo('.filters');

    ajaxPromise("module/shop/ctrl/ctrl_shop.php?op=filters", "GET", "JSON")
        .then(function(data) {
            renderFilters(data.filters, data.values);
            restoreAllFilters();
            attachFilterListeners();
        });
}

function renderFilters(filters, values) {
    let html = "";

    filters.forEach(f => {
        const vals = values.filter(v => v.id_filter == f.id_filter);
        const type = f.type_filter; // checkbox, radio, select, slider

        if (type === "checkbox") {
            html += `<div class="space-y-2">
                        <p class="text-slate-300 text-xs uppercase font-bold">${f.label}</p>`;
            vals.forEach(v => {
                html += `
                <label class="flex items-center gap-3 cursor-pointer group">
                    <span class="relative flex items-center justify-center w-5 h-5 rounded border border-primary/30 bg-background-dark transition-all group-hover:border-primary">
                        <input type="checkbox" class="filter_input absolute opacity-0" 
                               data-filter="${f.name_filter}" value="${v.value}">
                        <span class="checkmark hidden text-primary text-lg leading-none">✓</span>
                    </span>
                    <span class="text-slate-100 text-sm group-hover:text-primary transition-all">${v.label}</span>
                </label>`;
            });
            html += `</div>`;
        }

        if (type === "radio") {
            html += `<div class="space-y-2">
                        <p class="text-slate-300 text-xs uppercase font-bold">${f.label}</p>`;
            vals.forEach(v => {
                html += `
                <label class="flex items-center gap-3 cursor-pointer group">
                    <span class="relative flex items-center justify-center w-5 h-5 rounded-full border border-primary/30 bg-background-dark transition-all group-hover:border-primary">
                        <input type="radio" name="${f.name_filter}" class="filter_input absolute opacity-0" 
                               data-filter="${f.name_filter}" value="${v.value}">
                        <span class="dot hidden w-2 h-2 rounded-full bg-primary"></span>
                    </span>
                    <span class="text-slate-100 text-sm group-hover:text-primary transition-all">${v.label}</span>
                </label>`;
            });
            html += `</div>`;
        }

        if (type === "select") {
            html += `<select class="filter_input w-full bg-background-dark border border-primary/20 rounded-lg p-2 text-sm text-slate-100 focus:border-primary outline-none"
                             data-filter="${f.name_filter}">
                        <option value="">-- ${f.label} --</option>`;
            vals.forEach(v => {
                html += `<option value="${v.value}">${v.label}</option>`;
            });
            html += `</select>`;
        }

        if (type === "slider") {
            html += `
            <div class="space-y-2">
                <p class="text-slate-300 text-xs uppercase font-bold">${f.label}</p>
                <input type="range" min="0" max="500" value="500" 
                       class="filter_input w-full accent-primary" data-filter="${f.name_filter}">
                <div class="flex justify-between text-xs text-slate-400 font-bold">
                    <span>0€</span>
                    <span class="price_value">500€</span>
                </div>
            </div>`;
        }
    });

    $(".div-filters").html(html + `
        <button class="filter_remove w-full border border-primary/30 text-primary hover:bg-primary/10 py-2 rounded-lg text-xs font-bold uppercase transition-all">Limpiar</button>
    `);
}

function restoreAllFilters() {
    const filtro = JSON.parse(localStorage.getItem('filter')) || [];

    filtro.forEach(f => {
        const [name, valor] = f;
        const inputs = $(`.filter_input[data-filter="${name}"]`);

        // Checkbox (varios valores)
        if (inputs.attr('type') === 'checkbox') {
            const vals = Array.isArray(valor) ? valor : [valor];
            vals.forEach(v => {
                const input = inputs.filter(`[value="${v}"]`);
                input.prop("checked", true);
                input.siblings(".checkmark").removeClass("hidden");
            });
        }

        // Radio (solo uno)
        if (inputs.attr('type') === 'radio') {
            const input = inputs.filter(`[value="${valor}"]`);
            input.prop("checked", true);
            input.siblings(".dot").removeClass("hidden");
        }

        // Select
        if (inputs.is('select')) {
            inputs.val(valor);
        }

        // Slider
        if (inputs.attr('type') === 'range') {
            inputs.val(valor);
            $(".price_value").text(valor + "€");
        }
    });
}

function attachFilterListeners() {
    $(document).on("change", "input[type='checkbox'].filter_input", function () {
        $(this).siblings(".checkmark").toggleClass("hidden", !this.checked);
        applyFiltersNow(); 
    });

    $(document).on("change", "input[type='radio'].filter_input", function () {
        const name = $(this).attr("name");
        $(`input[type='radio'][name="${name}"]`).each(function () {
            $(this).siblings(".dot").addClass("hidden");
        });
        $(this).siblings(".dot").removeClass("hidden");
        applyFiltersNow();
    });

    $(document).on("input", "input[type='range'].filter_input", function () {
        $(".price_value").text($(this).val() + "€");
    });

    $(document).on("change", "input[type='range'].filter_input", function () {
        applyFiltersNow(); 
    });

    $(document).on("change", "select.filter_input", function () {
        applyFiltersNow();
    });
}

function applyFiltersNow() {
    var filter = [];
    var processed = {};

    $('.filter_input').each(function () {
        const name = $(this).data('filter');
        const type = $(this).attr('type') || 'select';
        if (processed[name]) return;

        if (type === 'checkbox') {
            const vals = [];
            const labelsList = [];
            $(`.filter_input[data-filter="${name}"]:checked`).each(function() {
                vals.push($(this).val());
                labelsList.push($(this).closest('label').find('span:last-child').text().trim());
            }).get();
            if (vals.length > 0) filter.push([name, vals, labelsList]);
            processed[name] = true;
        }
        if (type === 'radio') {
            const input = $(`.filter_input[data-filter="${name}"]:checked`);
            const val = $(`.filter_input[data-filter="${name}"]:checked`).val();
            const label = input.closest('label').find('span:last-child').text().trim();
            if (val) filter.push([name, val, label]);
            processed[name] = true;
        }
        if ($(this).is('select')) {
            const val = $(this).val();
            const label = $(this).find('option:selected').text();
            if (val) filter.push([name, val, label]);
            processed[name] = true;
        }
        if (type === 'range') {
            const val = $(this).val();
            if (val && val != 500) filter.push([name, val]);
            processed[name] = true;
        }
    });

    localStorage.setItem('filter', JSON.stringify(filter));
    renderActiveChips(filter);

    if (filter.length > 0) {
        ajaxForSearch("module/shop/ctrl/ctrl_shop.php?op=filter", filter);
    } else {
        ajaxForSearch("module/shop/ctrl/ctrl_shop.php?op=all_eventos");
    }
}

function renderActiveChips(filter) {
    const bar = $('#active-filters-bar');
    const chips = $('#active-chips');
    chips.empty();

    const filterLabels = {
        fighters: 'Luchador',
        categories: 'Categoría',
        cities: 'Ciudad',
        price_max: 'Precio máx'
    };

    if (!filter || filter.length === 0) {
        bar.hide();
        $('#filter-count-badge').addClass('hidden');
        return;
    }

    filter.forEach(function(f) {
        const [name, valor, displayLabels] = f;
        const label = filterLabels[name] || name;
        const vals = Array.isArray(valor) ? valor : [valor];
        const labelsList = Array.isArray(displayLabels) ? displayLabels : [displayLabels || valor];

        vals.forEach(function(v, i) {
            const displayVal = labelsList[i] || (name === 'price_max' ? v + '€' : v);
            const chip = $(`
                <span style="display:inline-flex; align-items:center; gap:5px; background:rgba(242,13,13,0.12); border:1px solid rgba(242,13,13,0.3); color:#c0392b; border-radius:20px; padding:4px 10px; font-size:12px; font-weight:600; cursor:pointer;">
                    ${label}: <b>${displayVal}</b>
                    <span style="opacity:0.7; font-size:14px; line-height:1;">✕</span>
                </span>
            `);
            chip.on('click', function() {
                removeOneFilter(name, v);
            });
            chips.append(chip);
        });
    });

    let total = 0;
    filter.forEach(f => {
        const vals = Array.isArray(f[1]) ? f[1] : [f[1]];
        total += vals.length;
    });

    if (total > 0) {
        $('#filter-count-badge').text(total).removeClass('hidden');
    } else {
        $('#filter-count-badge').addClass('hidden');
    }

    bar.show();
}

function removeOneFilter(name, val) {
    var filter = JSON.parse(localStorage.getItem('filter')) || [];

    filter = filter.map(function(f) {
        if (f[0] !== name) return f;
        if (Array.isArray(f[1])) {
            const newVals = f[1].filter(v => v != val);
            return newVals.length > 0 ? [f[0], newVals] : null;
        }
        return null;
    }).filter(Boolean);

    localStorage.setItem('filter', JSON.stringify(filter));

    // Desmarcar visualmente el input correspondiente
    const input = $(`.filter_input[data-filter="${name}"][value="${val}"]`);
    input.prop('checked', false);
    input.siblings('.checkmark, .dot').addClass('hidden');
    const selectInput = $(`.filter_input[data-filter="${name}"]`);
    if (selectInput.is('select')) selectInput.val('');

    renderActiveChips(filter);
    if (filter.length > 0) {
        ajaxForSearch("module/shop/ctrl/ctrl_shop.php?op=filter", filter);
    } else {
        ajaxForSearch("module/shop/ctrl/ctrl_shop.php?op=all_eventos");
    }
}

function filter_button() {
    $(document).on('click', '.filter_remove, #clear-all-filters', function () {
        localStorage.removeItem('filter');
        renderActiveChips([]);
        $('.filter_input[type="checkbox"], .filter_input[type="radio"]').prop('checked', false);
        $('.checkmark, .dot').addClass('hidden');
        $('select.filter_input').val('');
        $('input[type="range"].filter_input').val(500);
        $('.price_value').text('500€');
        ajaxForSearch("module/shop/ctrl/ctrl_shop.php?op=all_eventos");
    });
}


/* 
            if (filter == 0) {
                ajaxForSearch("modules/shop/crtl/crtl_shop.php?op=shopAll");
                highlight(filter);
            } */


let mapInstance = null;

function mapBox_all(shop) {
    if (mapInstance) {
        mapInstance.remove(); // 👈 destruye el mapa anterior
        mapInstance = null;
    }

    mapInstance = L.map('map').setView([20, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(mapInstance);

    for (let row in shop) {
        const images = Array.isArray(shop[row].images) ? shop[row].images : [];
        const swiperId = 'map-swiper-' + shop[row].id_event;

        const slides = images.map(img =>
            '<div class="swiper-slide"><img src="' + img + '" style="width:200px; height:110px; object-fit:cover;"/></div>'
        ).join('');

        const popupHTML =
            '<div class="swiper ' + swiperId + '" style="width:210px; height:120px;">' +
                '<div class="swiper-wrapper">' + slides + '</div>' +
                '<div class="swiper-button-next" style="transform:scale(0.45); color:#f20d0d;"></div>' +
                '<div class="swiper-button-prev" style="transform:scale(0.45); color:#f20d0d;"></div>' +
            '</div>' +
            '<div style="padding: 10px 12px;">' +
                '<span style="background:#f20d0d; color:white; font-size:10px; font-weight:900; padding:2px 8px; border-radius:4px; text-transform:uppercase; letter-spacing:0.1em;">' + shop[row].org_name + '</span>' +
                '<h3 style="color:white; font-weight:900; font-size:13px; text-transform:uppercase; font-style:italic; margin:6px 0 4px;">' + shop[row].event_name + '</h3>' +
                '<p style="color:#94a3b8; font-size:11px; margin:2px 0;">📅 ' + shop[row].event_date + '</p>' +
                '<p style="color:#94a3b8; font-size:11px; margin:2px 0;">📍 ' + shop[row].venue_name + ', ' + shop[row].city_name + '</p>' +
                '<p style="color:#f20d0d; font-weight:900; font-size:15px; margin-top:6px;">Desde ' + shop[row].base_price + '€</p>' +
            '</div>';

        const marker = L.marker([shop[row].lat, shop[row].longi])
            .addTo(mapInstance)
            .bindPopup(popupHTML, { maxWidth: 220, className: 'popup-mma' });
        
        marker.on('popupopen', function() {
            setTimeout(function() {
                new Swiper('.' + swiperId, {
                    loop: images.length > 1,
                    navigation: {
                        nextEl: '.' + swiperId + ' .swiper-button-next',
                        prevEl: '.' + swiperId + ' .swiper-button-prev'
                    }
                });
            }, 50);
        });
    }
}

let mapDetailInstance = null;

function mapBox(id) {
    if (mapDetailInstance) {
        mapDetailInstance.remove();
        mapDetailInstance = null;
    }

    mapDetailInstance = L.map('map-detail').setView([id.lat, id.longi], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(mapDetailInstance);

    const images = Array.isArray(id.images) ? id.images : [];
    const swiperId = 'map-detail-swiper-' + id.id_event;

    const slides = images.map(img =>
        '<div class="swiper-slide"><img src="' + img + '" style="width:220px; height:120px; object-fit:cover;"/></div>'
    ).join('');

    const popupHTML =
        '<div class="' + swiperId + ' swiper" style="width:220px; height:120px;">' +
            '<div class="swiper-wrapper">' + slides + '</div>' +
            (images.length > 1
                ? '<div class="swiper-button-next" style="transform:scale(0.45); color:#f20d0d;"></div>' +
                  '<div class="swiper-button-prev" style="transform:scale(0.45); color:#f20d0d;"></div>'
                : '') +
            '<div class="swiper-pagination"></div>' +
        '</div>' +
        '<div style="padding:10px 12px 12px;">' +
            '<span style="background:#f20d0d; color:white; font-size:10px; font-weight:900; padding:2px 8px; border-radius:4px; text-transform:uppercase; letter-spacing:0.1em;">' + id.org_name + '</span>' +
            '<h3 style="color:white; font-weight:900; font-size:13px; text-transform:uppercase; font-style:italic; margin:6px 0 4px; line-height:1.3;">' + id.event_name + '</h3>' +
            '<p style="color:#94a3b8; font-size:11px; margin:2px 0;">📅 ' + id.event_date + '</p>' +
            '<p style="color:#94a3b8; font-size:11px; margin:2px 0;">📍 ' + id.venue_name + ', ' + id.city_name + '</p>' +
            '<p style="color:#f20d0d; font-weight:900; font-size:15px; margin-top:6px;">Desde ' + id.base_price + '€</p>' +
        '</div>';

    const marker = L.marker([id.lat, id.longi])
        .addTo(mapDetailInstance)
        .bindPopup(popupHTML, { maxWidth: 240, className: 'popup-mma' })

    marker.on('popupopen', function () {
        setTimeout(function () {
            new Swiper('.' + swiperId, {
                loop: images.length > 1,
                pagination: {
                    el: '.' + swiperId + ' .swiper-pagination',
                    clickable: true
                },
                navigation: {
                    nextEl: '.' + swiperId + ' .swiper-button-next',
                    prevEl: '.' + swiperId + ' .swiper-button-prev'
                }
            });
        }, 50);
    });
}


$(document).ready(function() {
    loadEventos();
    clicks();
    print_filters();
    filter_button();
});