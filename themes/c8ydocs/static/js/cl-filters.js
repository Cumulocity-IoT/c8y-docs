let filters = {};
let $list;
let dates;
let internal = false;



function getURLParameters() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = {};

  for (const [key, value] of urlSearchParams) {
    if (value != '') {
      if (key === 'internal' && value === 'true') {
        internal = true;
      } else {
        params[key] = value;
      }
    }
  }
  handleInternal();
  return params;
}

// Conditionally removes the class `hidden` from specific elements
function handleInternal() {
  let els = document.querySelectorAll('[data-internal]');
  if (internal) {
    els.forEach(el => {
      el.classList.remove('hidden');
    });
  }
}

function concatFilters(obj) {
  const nonEmptyValues = Object.values(obj).filter(value => value.length > 0);
  if (nonEmptyValues.length === 0) {
    return '';
  }
  const result = nonEmptyValues.map(value => value.split(',')).reduce((a, b) => a.flatMap(x => b.map(y => x + y)));
  return result.join(', ');
}


function checkPa(pas) {
  let comps = document.querySelectorAll('[data-filter-group="component"] [data-pa]');
  let areas = pas.map(pa => pa.substr(12));
  comps.forEach(comp => {
    let cpa = comp.getAttribute('data-pa');
    if (areas.length === 0 || areas.includes(cpa) || areas.includes('')) {
      comp.removeAttribute('disabled');
    } else {
      comp.setAttribute('disabled', 'disabled');
    }
  });
}

function clearAllFilters() {
  let filters = document.querySelectorAll('.filter-btn');
  filters.forEach(filter => {
    if (filter.checked) {
      filter.click();
    }
  });
}

function applyCheckbox(name) {
  const filter = document.querySelector('[name="' + name + '"]');
  if (filter && !filter.checked) {
    filter.click();
  }
}

/// Function to update checkboxes based on filters
function updateCheckboxes(filters) {
  // Loop through filters and update checkboxes
  Object.keys(filters).forEach(key => {
    let filterGroup = document.querySelector(`[data-filter-group="${key}"]`);
    if (filterGroup) {
      // Uncheck all checkboxes in the group
      filterGroup.querySelectorAll(':checked').forEach(checkbox => {
        checkbox.checked = false;
      });

      // Check checkboxes based on filters
      filters[key].split(',').forEach(value => {
        value = value.substring(1);
        let checkbox = filterGroup.querySelector('[name="' + value + '"]');
        if (checkbox) {
          checkbox.checked = true;
          checkbox.dispatchEvent(new Event('change'));
        }
      });
    }
  });
}

window.onload = (event) => {
  $list = $('.change-logs--list > article > .isotope').isotope({
    itemSelector: '.page-section:not(.top)',
    layoutMode: 'vertical',
    transitionDuration: 0
  });

  let $empty = document.getElementById('emptystate');
  const searchClear = document.getElementById('clearFilters');
  searchClear.addEventListener('click', clearAllFilters);
  $list.on( 'arrangeComplete',
  function (event, filteredItems) {
    if (filteredItems.length === 0) {
      $empty.style.display = "block";
    } else {
      let d = 'block';
      $empty.classList.add('no-results');
      for (let index = 0; index < filteredItems.length; index++) {
        const element = filteredItems[index].element;
        if (!element.classList.contains('change-log__date')) {
          d = 'none';
          $empty.classList.remove('no-results');
          break;
        }
      }
      $empty.style.display = d;
    }
  }
);


  const applyFilters = () => {
    // Update filters with the latest URL parameters
    filters = getURLParameters();

    const filterValueFromParams = concatFilters(filters);
    $list.isotope({ filter: filterValueFromParams });

    // Disable components based on selected product areas
    let productAreaFilters = filters['productarea'] || '';
    let selectedProductAreas = productAreaFilters.split(',').map(pa => pa.substr(1));
    checkPa(selectedProductAreas);
    // Handle the dates
    dates.forEach(date => {
      let el = document.querySelector('[data-refid="' + date.id + '"]');
      if (date.style.display == "none") {
        el.style.display = "none";
      } else {
        el.style.display = '';
      }
    });

    updateCheckboxes(filters);
  };

  dates = document.querySelectorAll('.change-log__date');

  const fieldsetGroups = document.querySelectorAll('.filter-fieldset.c8y-fieldset');

  // Apply filters from URL parameters on page load
  applyFilters();

  // Update filters when URL parameters change
  window.addEventListener('popstate', () => {
    applyFilters();
  });

  fieldsetGroups.forEach(fieldsetGroup => {
    fieldsetGroup.addEventListener('change', (e) => {
      let filterGroup = fieldsetGroup.getAttribute('data-filter-group');
      let filterGroupFilters = [];
      fieldsetGroup.querySelectorAll(':checked').forEach(checkedFilter => {
        filterGroupFilters.push('.' + checkedFilter.name);
      });

      // Update URL parameters
      let params = new URLSearchParams(window.location.search);
      params.set(filterGroup, filterGroupFilters.join(','));
      for (let [key, value] of params.entries()) {
        if (value === '') {
          params.delete(key);
        }
      }
      history.replaceState({}, '', window.location.pathname + '?' + params);
      applyFilters();
    });
  });

  // filter from the metadata
  const tagBtns = document.querySelectorAll('[data-tag]');
  tagBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      applyCheckbox(btn.getAttribute('data-tag'));
    });
  });

  // Update filters when URL parameters change
  window.addEventListener('popstate', () => {
    applyFilters();
  });
  
  // Get the hash from the URL and scroll into it
  const hash = window.location.hash;
  const targt = hash ? document.querySelector(hash) : false;
  if (hash && targt) {
    setTimeout(() => {
      targt.scrollIntoView();
    }, 100);
  }
};
