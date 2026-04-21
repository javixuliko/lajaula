function loadEventosImagenes() {
    //console.log('loadCategories() called');

    ajaxPromise('module/home/controller/controller_home.php?op=homePageEventsImages','GET', 'JSON')
    .then(function(data) {
        console.log(data);

        for (let row = 0; row < data.length; row++) {
            $('<div></div>')
                .addClass("swiper-slide")
                .attr('id', data[row].id_image)
                .appendTo('#containerEventsImages')
                .html(
                    "<div style='width:100%; height:100%; background-image: url(" 
                    + data[row].image_url + "); background-size: cover; background-position: center;'></div>"
                );
        }
        new Swiper('.swiper-eventos-imagenes', {
            loop: true,
            autoplay: { delay: 5000 },
            pagination: { el: '.swiper-eventos-imagenes .swiper-pagination', clickable: true },
            navigation: {
                nextEl: '.swiper-eventos-imagenes .swiper-button-next',
                prevEl: '.swiper-eventos-imagenes .swiper-button-prev',
            },
        });
    }).catch(function() {
        //window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Type_Categories HOME";
    });
}

function loadFights() {
    ajaxPromise('module/home/controller/controller_home.php?op=homePageFights','GET', 'JSON')
    .then(function(data) {
        console.log(data);

        for (let row = 0; row < data.length; row++) {
            $('<div></div>')
                .addClass("swiper-slide")
                .attr('id', data[row].id_fight)
                .appendTo('#containerFights')
                .html(
                    "<div class='group dark:bg-background-dark rounded-xl overflow-hidden shadow-xl " + 
                        (data[row].is_title_fight == 1 ? "border-2 border-yellow-500" : "border border-slate-200 dark:border-primary/10") + 
                        "' style='height:320px;'>" +
                        "<div class='relative h-48 overflow-hidden'>" +
                            "<div class='absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110' style='background-image: url(" + data[row].fight_image + ")'></div>" +
                            (data[row].is_title_fight == 1 ? "<div class='absolute top-0 left-0 bg-yellow-500 text-slate-900 text-xs font-black px-3 py-1 rounded-br-xl uppercase tracking-widest'>🏆 Título</div>" : "") +
                        "</div>" +
                        "<div class='p-4 flex flex-col justify-between' style='height:calc(320px - 192px)'>" +
                            "<h4 class='text-lg font-bold text-slate-900 dark:text-white'>" + data[row].nombre + "</h4>" +
                            "<button class='bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-xs font-black transition-all w-fit'>Comprar entradas</button>" +
                        "</div>" +
                    "</div>"
                );
        }

        new Swiper('.swiper-fights', {
            loop: true,
            autoplay: { delay: 5000 },
            slidesPerView: 3,
            spaceBetween: 32,
            navigation: {
                nextEl: '.swiper-fights .swiper-button-next',
                prevEl: '.swiper-fights .swiper-button-prev',
            },
            breakpoints: {
                0:    { slidesPerView: 1 },
                768:  { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
            }
        });
    }).catch(function() {});
}

function loadFighters() {
    ajaxPromise('module/home/controller/controller_home.php?op=homePageFighters','GET', 'JSON')
    .then(function(data) {
        console.log(data);

        for (let row = 0; row < data.length; row++) {
            $('<div></div>')
                .addClass("swiper-slide")
                .attr('id', data[row].id_fighter)
                .appendTo('#containerFighters')
                .html(
                    "<div class='group relative rounded-xl overflow-hidden shadow-xl' style='height:280px;'>" +
                        "<div class='absolute inset-0 bg-cover bg-top transition-transform duration-500 group-hover:scale-110' style='background-image: url(" + data[row].fighter_image + ")'></div>" +
                        "<div class='absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent'></div>" +
                        "<div class='absolute bottom-0 left-0 p-4 w-full'>" +
                            "<h4 class='text-lg font-black text-white'>" + data[row].fighter_name + "</h4>" +
                            (data[row].nickname ? "<span class='text-primary text-xs font-bold italic'>\"" + data[row].nickname + "\"</span><br/>" : "") +
                            "<div class='flex gap-3 mt-2'>" +
                                "<span class='text-white text-xs'><span class='text-primary font-black'>" + data[row].wins + "</span> W</span>" +
                                "<span class='text-white text-xs'><span class='text-slate-400 font-black'>" + data[row].losses + "</span> L</span>" +
                                "<span class='text-white text-xs'><span class='text-slate-400 font-black'>" + data[row].draws + "</span> D</span>" +
                            "</div>" +
                        "</div>" +
                    "</div>"
                );
        }

        new Swiper('.swiper-fighters', {
            loop: true,
            autoplay: { delay: 5000 },
            slidesPerView: 4,
            spaceBetween: 24,
            navigation: {
                nextEl: '.swiper-fighters .swiper-button-next',
                prevEl: '.swiper-fighters .swiper-button-prev',
            },
            breakpoints: {
                0:    { slidesPerView: 1 },
                768:  { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
            }
        });
    }).catch(function() {});
}

function loadCategories() {
    ajaxPromise('module/home/controller/controller_home.php?op=homePageCategories','GET', 'JSON')
    .then(function(data) {
        console.log(data);

        for (let row = 0; row < data.length; row++) {
            $('<div></div>')
                .addClass("swiper-slide")
                .attr('id', data[row].id_category)
                .appendTo('#containerCategories')
                .html(
                    "<div class='group relative rounded-xl overflow-hidden shadow-xl' style='height:200px;'>" +
                        "<div class='absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110' style='background-image: url(" + data[row].cat_image + ")'></div>" +
                        "<div class='absolute inset-0 bg-gradient-to-t from-black/80 to-transparent'></div>" +
                        "<div class='absolute inset-0 flex items-center justify-center'>" +
                            "<h4 class='text-2xl font-black text-white uppercase tracking-widest text-center px-4'>" + data[row].cat_name + "</h4>" +
                        "</div>" +
                    "</div>"
                );
        }

        new Swiper('.swiper-categories', {
            loop: true,
            autoplay: { delay: 4000 },
            slidesPerView: 4,
            spaceBetween: 24,
            navigation: {
                nextEl: '.swiper-categories .swiper-button-next',
                prevEl: '.swiper-categories .swiper-button-prev',
            },
            breakpoints: {
                0:    { slidesPerView: 2 },
                768:  { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
            }
        });
    }).catch(function() {});
}

function loadCities() {
    ajaxPromise('module/home/controller/controller_home.php?op=homePageCities','GET', 'JSON')
    .then(function(data) {
        console.log(data);

        for (let row = 0; row < data.length; row++) {
            $('<div></div>')
                .addClass("swiper-slide")
                .attr('id', data[row].id_city)
                .appendTo('#containerCities')
                .html(
                    "<div class='group bg-white dark:bg-background-dark border border-slate-200 dark:border-primary/10 rounded-xl overflow-hidden shadow-xl flex' style='height:160px;'>" +
                        "<div class='relative w-2/5 overflow-hidden'>" +
                            "<div class='absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110' style='background-image: url(" + data[row].city_image + ")'></div>" +
                        "</div>" +
                        "<div class='p-5 flex flex-col justify-center w-3/5'>" +
                            "<span class='text-primary text-xs font-bold uppercase tracking-widest mb-1'>" + data[row].country + "</span>" +
                            "<h4 class='text-xl font-black text-slate-900 dark:text-white'>" + data[row].city_name + "</h4>" +
                            "<span class='material-symbols-outlined text-primary mt-2'>location_on</span>" +
                        "</div>" +
                    "</div>"
                );
        }

        new Swiper('.swiper-cities', {
            loop: true,
            autoplay: { delay: 5000 },
            slidesPerView: 3,
            spaceBetween: 32,
            navigation: {
                nextEl: '.swiper-cities .swiper-button-next',
                prevEl: '.swiper-cities .swiper-button-prev',
            },
            breakpoints: {
                0:    { slidesPerView: 1 },
                768:  { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
            }
        });
    }).catch(function() {});
}

function loadVenues() {
    ajaxPromise('module/home/controller/controller_home.php?op=homePageVenues','GET', 'JSON')
    .then(function(data) {
        console.log(data);

        for (let row = 0; row < data.length; row++) {
            $('<div></div>')
                .addClass("swiper-slide")
                .attr('id', data[row].id_venue)
                .appendTo('#containerVenues')
                .html(
                    "<div class='group relative rounded-xl overflow-hidden shadow-xl' style='height:220px;'>" +
                        "<div class='absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110' style='background-image: url(" + data[row].venue_image + ")'></div>" +
                        "<div class='absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent'></div>" +
                        "<div class='absolute bottom-0 left-0 p-4'>" +
                            "<span class='text-primary text-xs font-bold uppercase tracking-widest'>" + (data[row].city_name || '') + "</span>" +
                            "<h4 class='text-lg font-black text-white'>" + data[row].venue_name + "</h4>" +
                            "<span class='text-slate-300 text-xs'>" + (data[row].capacity ? '🏟️ ' + data[row].capacity + ' capacidad' : '') + "</span>" +
                        "</div>" +
                    "</div>"
                );
        }

        new Swiper('.swiper-venues', {
            loop: true,
            autoplay: { delay: 5000 },
            slidesPerView: 3,
            spaceBetween: 32,
            navigation: {
                nextEl: '.swiper-venues .swiper-button-next',
                prevEl: '.swiper-venues .swiper-button-prev',
            },
            breakpoints: {
                0:    { slidesPerView: 1 },
                768:  { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
            }
        });
    }).catch(function() {});
}

function clicks(){
    // Evento
    $(document).on("click", '.slide-evento', function(){
        localStorage.setItem('pendingEventDetail', this.getAttribute('id'));
        setTimeout(function(){ 
            window.location.href = 'index.php?module=ctrl_shop&op=list';
        }, 1000);  
    }); 

    // Pelea filtrar por 2 peleadores
    $(document).on("click", '.slide-fight', function(){
        var filters = [];
        var f1 = this.getAttribute('data-fighter1');
        var f2 = this.getAttribute('data-fighter2');
        var l1 = this.getAttribute('data-fighter1-label');
        var l2 = this.getAttribute('data-fighter2-label');
        filters.push(["fighters", [f1, f2], [l1, l2]]);
        localStorage.removeItem('filter');
        localStorage.setItem('filter', JSON.stringify(filters));
        setTimeout(function(){ 
            window.location.href = 'index.php?module=ctrl_shop&op=list';
        }, 1000);  
    }); 

    // Peleador
    $(document).on("click", '.slide-fighter', function(){
        var filters = [];
        var label = $(this).find('h4').text().trim();
        filters.push(["fighters", [this.getAttribute('id')], [label]]);
        localStorage.removeItem('filter');
        localStorage.setItem('filter', JSON.stringify(filters));
        setTimeout(function(){ 
            window.location.href = 'index.php?module=ctrl_shop&op=list';
        }, 1000);  
    }); 

    // Categoría
    $(document).on("click", '.slide-category', function(){
        var filters = [];
        var label = $(this).find('h4').text().trim();
        filters.push(["categories", [this.getAttribute('id')], [label]]);
        localStorage.removeItem('filter');
        localStorage.setItem('filter', JSON.stringify(filters));
        setTimeout(function(){ 
            window.location.href = 'index.php?module=ctrl_shop&op=list';
        }, 1000);  
    }); 

    // Ciudad
    $(document).on("click", '.slide-city', function(){
        var filters = [];
        var label = $(this).find('h4').text().trim();
        filters.push(["cities", [this.getAttribute('id')], [label]]);
        localStorage.removeItem('filter');
        localStorage.setItem('filter', JSON.stringify(filters));
        setTimeout(function(){ 
            window.location.href = 'index.php?module=ctrl_shop&op=list';
        }, 1000);  
    }); 

    // Recinto usa la ciudad
    $(document).on("click", '.slide-venue', function(){
        var filters = [];
        var cityId = this.getAttribute('data-city-id');
        var cityLabel = $(this).find('.text-primary').text().trim();
        filters.push(["cities", [cityId], [cityLabel]]);
        localStorage.removeItem('filter');
        localStorage.setItem('filter', JSON.stringify(filters));
        setTimeout(function(){ 
            window.location.href = 'index.php?module=ctrl_shop&op=list';
        }, 1000);  
    }); 
}

$(document).ready(function () {
    //console.log('controller_home.js loaded');

    loadEventosImagenes();
    loadFights();
    loadFighters();
    loadCategories();
    loadCities();
    loadVenues();
    clicks();
});
