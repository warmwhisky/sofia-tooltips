/**
 * Sofia and the Monarch Tooltip Library
 * Lightweight, elegant, and reusable tooltip system for jQuery + Tailwind 4
 * Now with positioning, arrow, configurable options, click trigger, touch support, HTML content, max-width, and attribute-based control!
 *
 * Usage:
 * 1. Add data-tooltip="Your text" to any element.
 * 2. Optional: data-tooltip-position="top|bottom|left|right" (default: top)
 * 3. Optional: data-tooltip-trigger="hover|click" (default: hover)
 * 4. Optional: data-tooltip-fade="200" (fade duration in ms)
 * 5. Optional: data-tooltip-move="5" (movement amount in px)
 * 6. Optional: data-tooltip-html="true" (allows HTML content inside tooltip)
 * 7. Optional: data-tooltip-maxwidth="200px" (CSS max-width for tooltip)
 *
 * Example:
 * <button data-tooltip="Hello World!" data-tooltip-position="bottom" data-tooltip-trigger="click">Click Me</button>
 * <div data-tooltip="<strong>Bold text</strong> is supported!" data-tooltip-html="true">Hover Me</div>
 *
 * Simply import and initialize:
 * import initSofiaTooltip from './sofia_tooltips.js';
 * import $ from 'jquery';
 * initSofiaTooltip($);
 */

export default function initSofiaTooltip($) {
    const defaultOptions = {
        fadeDuration: 200,
        movement: 5,
        maxWidth: '240px',
    };

    const $tooltip = $('<div id="sofia-tooltip" class="pointer-events-none fixed z-50 text-sm rounded bg-black text-white px-2 py-1 opacity-0 transition-all transform scale-95 shadow-xl max-w-xs">\n' +
        '<div class="tooltip-content"></div>\n' +
        '<div class="tooltip-arrow absolute w-3 h-3 bg-gray-800 rotate-45"></div>\n' +
        '</div>').appendTo('body');

    let hideTimeout;
    let activeTrigger = 'hover';

    function showTooltip($target, content, position, options = {}) {
        clearTimeout(hideTimeout);
        const settings = { ...defaultOptions, ...options };

        const isHtml = $target.attr('data-tooltip-html') === 'true';
        const maxWidth = $target.attr('data-tooltip-maxwidth') || settings.maxWidth;

        const $content = $tooltip.find('.tooltip-content');
        if (isHtml) {
            $content.html(content);
        } else {
            $content.text(content);
        }

        $tooltip.css({
            opacity: 0,
            transform: `translateY(${settings.movement}px) scale(0.98)`,
            maxWidth: maxWidth
        }).show();

        positionTooltip($target, position);

        requestAnimationFrame(() => {
            $tooltip.css({ opacity: 1, transform: 'translateY(0) scale(1)', transitionDuration: `${settings.fadeDuration}ms` });
        });
    }

    function hideTooltip() {
        const duration = defaultOptions.fadeDuration;
        $tooltip.css({ opacity: 0, transform: `translateY(${defaultOptions.movement}px) scale(0.98)`, transitionDuration: `${duration}ms` });
        hideTimeout = setTimeout(() => $tooltip.hide(), duration);
    }

    function positionTooltip($target, position = 'top') {
        const offset = $target.offset();
        const tooltipWidth = $tooltip.outerWidth();
        const tooltipHeight = $tooltip.outerHeight();
        const targetWidth = $target.outerWidth();
        const targetHeight = $target.outerHeight();

        let top = 0, left = 0;
        const $arrow = $tooltip.find('.tooltip-arrow');

        switch (position) {
            case 'bottom':
                $arrow.css({ margin: 0, marginLeft: 0, marginRight: 0 });
                top = offset.top + targetHeight + 8;
                left = offset.left + (targetWidth / 2) - (tooltipWidth / 2);
                $arrow.css({ top: '0px', left: '50%', transform: 'translateX(-50%) rotate(45deg)' });
                break;

            case 'left':
                $arrow.css({ margin: 0, marginLeft: 0, marginRight: 0 });
                top = offset.top + (targetHeight / 2) - (tooltipHeight / 2);
                left = offset.left - tooltipWidth - 8;
                $arrow.css({ top: '50%', left: '100%', transform: 'translateY(-50%) rotate(45deg)', marginLeft: '-12px' });
                break;

            case 'right':
                $arrow.css({ margin: 0, marginLeft: 0, marginRight: 0 });
                top = offset.top + (targetHeight / 2) - (tooltipHeight / 2);
                left = offset.left + targetWidth + 8;
                $arrow.css({ top: '50%', left: '0', transform: 'translateY(-50%) rotate(45deg)', marginLeft: '-12px' });
                break;

            default: // 'top'
                $arrow.css({ margin: 0, marginLeft: 0, marginRight: 0 });
                top = offset.top - tooltipHeight - 8;
                left = offset.left + (targetWidth / 2) - (tooltipWidth / 2);
                $arrow.css({ top: '100%', left: '50%', transform: 'translateX(-50%) rotate(45deg)' });
                break;
        }


        $tooltip.css({ top: `${top}px`, left: `${left}px` });
    }

    function getOptionsFromAttributes($target) {
        return {
            fadeDuration: parseInt($target.attr('data-tooltip-fade')) || defaultOptions.fadeDuration,
            movement: parseInt($target.attr('data-tooltip-move')) || defaultOptions.movement,
        };
    }

    function bindTooltipEvents() {
        $(document).on('mouseenter', '[data-tooltip]', function () {
            if ($(this).attr('data-tooltip-trigger') === 'click') return;
            activeTrigger = 'hover';
            const content = $(this).attr('data-tooltip');
            const position = $(this).attr('data-tooltip-position') || 'top';
            const options = getOptionsFromAttributes($(this));
            showTooltip($(this), content, position, options);
        });

        $(document).on('mouseleave', '[data-tooltip]', function () {
            if (activeTrigger !== 'hover') return;
            hideTooltip();
        });

        $(document).on('mousemove', '[data-tooltip]', function () {
            if (activeTrigger !== 'hover') return;
            const position = $(this).attr('data-tooltip-position') || 'top';
            positionTooltip($(this), position);
        });

        $(document).on('click touchstart', '[data-tooltip][data-tooltip-trigger="click"]', function (e) {
            e.stopPropagation();
            activeTrigger = 'click';
            const content = $(this).attr('data-tooltip');
            const position = $(this).attr('data-tooltip-position') || 'top';
            const options = getOptionsFromAttributes($(this));
            showTooltip($(this), content, position, options);
        });

        $(document).on('click touchstart', function () {
            if (activeTrigger === 'click') hideTooltip();
        });
    }

    $(document).ready(bindTooltipEvents);
}
