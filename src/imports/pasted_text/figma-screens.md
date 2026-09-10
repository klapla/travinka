# --- ЭКРАНЫ И КОМПОНЕНТЫ FIGMA (ПРОДОЛЖЕНИЕ) ---

[frame_3.story_scene_2_lookbook]
canvas_size = "1920x1080"
background = "bg_light"

    [frame_3.story_scene_2_lookbook.title]
    text = "КОЛЛЕКЦИИ"
    font = "header_font"
    size = "28px"
    color = "matte_black"
    position = "X: 120px, Y: 100px"
    letter_spacing = "0.3em"

    [frame_3.story_scene_2_lookbook.grid]
    layout = "Асимметричная сетка (Flis-grid), 3 карточки в ряд"
    padding_x = "120px"
    gap = "60px"

        [frame_3.story_scene_2_lookbook.grid.card_1]
        title = "01. Интерьерные букеты"
        size = "width: 480px, height: 650px"
        position_y = "220px" # Базовая линия
        hover_effect = "3D Depth Tilt (разворот карточки в пространстве на 5 градусов при наведении курса, проявляя объемный букет внутри)"
        action = "Open Full Screen Product Grid 1"

        [frame_3.story_scene_2_lookbook.grid.card_2]
        title = "02. Свадебное оформление"
        size = "width: 440px, height: 580px"
        position_y = "300px" # Смещение вниз для создания асимметрии
        hover_effect = "3D Depth Tilt"
        action = "Open Full Screen Product Grid 2"

        [frame_3.story_scene_2_lookbook.grid.card_3]
        title = "03. Авторский декор (Hand Made)"
        size = "width: 480px, height: 650px"
        position_y = "180px" # Смещение вверх для динамики
        hover_effect = "3D Depth Tilt"
        action = "Open Full Screen Product Grid 3"

[frame_4.story_scene_3_events]
canvas_size = "1920x1080"
background = "bg_main_dark" # Инверсия цвета обратно в глубокий темный

    [frame_4.story_scene_3_events.header]
    title = "АФИША МЕРОПРИЯТИЙ"
    font = "header_font"
    size = "36px"
    color = "text_primary"
    position = "Center X, Y: 100px"
    letter_spacing = "0.2em"

    [frame_4.story_scene_3_events.timeline_grid]
    layout = "Horizontal Flex-row, Auto-layout"
    gap = "40px"
    position = "X: 120px, Y: 260px"

        [frame_4.story_scene_3_events.timeline_grid.card_1]
        border = "1px solid rgba(214, 175, 55, 0.2)" # Тонкая золотая рамка
        size = "width: 520px, height: 550px"
        photo_asset = "Макро-фото рук, закрепляющих сухую ветку текстурной пастой на холсте. Низкий ключ."
        date = "Каждая суббота, 16:00"
        price = "1 500 ₽"
        title = "Объемное интерьерное панно"
        description = "Практический премиум-интенсив по созданию объемного настенного панно из текстурной пасты, стабилизированного мха и ветвей корицы. Готовая работа станет центральным арт-объектом вашего интерьера."
        button = { text = "ЗАБРОНИРОВАТЬ МЕСТО", font = "body_font", size = "11px", color = "text_primary", border = "1px solid accent_gold", hover = "Background fill with accent_gold, text to matte_black", action = "Open Popup Form" }

        [frame_4.story_scene_3_events.timeline_grid.card_2]
        border = "1px solid rgba(214, 175, 55, 0.2)"
        size = "width: 520px, height: 550px"
        photo_asset = "Невеста в шелковом платье держит букет и минималистичный венок из хлопка и лагуруса."
        date = "Каждое воскресенье, 14:00"
        price = "2 100 ₽"
        title = "Свадебный венок & Бутоньерка"
        description = "Погружение в свадебную флористику. Учимся работать с хрупким хлопком, воздушным лагурусом и сухоцветами премиальных сортов. Создание комплекта, который сохранит память о главном дне."
        button = { text = "ЗАБРОНИРОВАТЬ МЕСТО", font = "body_font", size = "11px", color = "text_primary", border = "1px solid accent_gold", hover = "Background fill with accent_gold, text to matte_black", action = "Open Popup Form" }

        [frame_4.story_scene_3_events.timeline_grid.card_3]
        border = "1px solid rgba(214, 175, 55, 0.2)"
        size = "width: 520px, height: 550px"
        photo_asset = "Элегантный стеклянный флакон, внутри которого в прозрачном масле красиво парят сухие бутоны роз."
        date = "Каждая среда, 19:30"
        price = "1 800 ₽"
        title = "Арома-диффузоры и ботаника"
        description = "Вечерняя сессия. Создание индивидуального интерьерного парфюма с интеграцией ботанических элементов (сухих бутонов роз, лаванды и корицы) внутрь флакона. Эстетика, раскрывающаяся через аромат."
        button = { text = "ЗАБРОНИРОВАТЬ МЕСТО", font = "body_font", size = "11px", color = "text_primary", border = "1px solid accent_gold", hover = "Background fill with accent_gold, text to matte_black", action = "Open Popup Form" }

    [frame_4.story_scene_3_events.interaction]
    mouse_physics = "При движении курсора по экрану фрейма, трехмерные цифровые частицы (лепестки роз, лаванда, флоксы) мягко расталкиваются в стороны, создавая физический эффект присутствия."

[frame_5.footer]
canvas_size = "1920x500"
background = "matte_black"

    [frame_5.footer.elements]
    map_widget = { type = "3D Canvas Globe", style = "Темная интерактивная сфера земли, шоурум в г. Ярославль отмечен сияющим золотым пином", position = "X: 120px, Y: Center Y", size = "300x300px" }
    address_block = { text = "Ярославль, ул. Победы 38/27\nТЦ Бутусовский\n+7 (920) 114-11-04", font = "body_font", size = "14px", color = "text_primary", line_height = "160%", position = "X: 480px, Y: Center Y" }
    loop_button = { text = "[ ВЕРНУТЬСЯ К ИСТОКАМ ]", font = "header_font", size = "20px", color = "accent_gold", letter_spacing = "0.2em", position = "Right: 120px, Y: Center Y", action = "Fast reverse auto-scroll with ease-in-out to Frame 1" }

# --- МОБИЛЬНАЯ АДАПТАЦИЯ (MOBILE VIEWPORTS) ---

[mobile_breakpoints]
viewport_size = "390x844" # iPhone 13/14 Pro стандарт

    [mobile_breakpoints.frame_1_hero]
    header = "Auto-layout: [ = MENU ] (left), ТРАВИНКА (center, size: 18px), Basket Icon (right). Надпись ЯРОСЛАВЛЬ скрыта."
    center_object = "Scale to 50% of screen height. Смещение по осям завязано на аппаратный гироскоп смартфона."
    side_elements = "left_vertical_text и right_vertical_text полностью скрыты (display: none)."
    button = "Кнопка [ SHOP NOW ] развернута во всю ширину экрана (padding-x: 20px), высота тач-зоны: 48px."

    [mobile_breakpoints.frame_3_lookbook]
    grid_transform = "Перестроить из 3-колонночной сетки в горизонтальный Swiper-компонент (Carousell). Карточка по центру экрана увеличивается на 10%, боковые карточки уходят в частичный opacity: 0.4."

    [mobile_breakpoints.frame_4_events]
    layout_transform = "Перестроить горизонтальный ряд карточек в вертикальный стэк (Vertical Auto-layout). Gap: 30px. Кнопки 'ЗАБРОНИРОВАТЬ МЕСТО' зафиксированы внизу каждой карточки на ширину 100%."

# --- ТРЕБОВАНИЯ К ИНТЕГРАЦИИ CMS ДЛЯ РАЗРАБОТЧИКОВ ---

[cms_architecture]
system_type = "Headless CMS или готовый визуальный движок управления коллекциями (Framer CMS / Webflow CMS)"

    [cms_architecture.fields_events]
    event_title = { type = "Plain Text", max_length = "60 chars", selector = ".card_title" }
    event_date = { type = "Plain Text", placeholder = "Пример: Каждая суббота, 16:00", selector = ".card_date" }
    event_price = { type = "Number", currency = "RUB", selector = ".card_price" }
    event_description = { type = "Rich Text", max_length = "300 chars", selector = ".card_description" }
    event_image = { type = "Image Asset", AspectRatio = "520:350", auto_compression = "WebP, high quality", selector = ".photo_asset" }

    [cms_architecture.sync_logic]
    on_change = "Любое изменение текстового или графического поля в административной панели CMS мгновенно обновляет связанный DOM-элемент на фронтенде сайта, включая данные внутри поп-ап формы бронирования, без необходимости повторной компиляции и деплоя кода."
