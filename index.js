const ACTIVE_STYLE = ['bg-orange-500/60'];

const sections = ['3 sections', '5 sections', '10 sections'];

const tones = [
  'Formal',
  'Friendly',
  'Causal',
  'Professional',
  'Diplomatic',
  'Middle school',
  'High school',
  'Academic',
  'Simplified',
  'Bold',
  'Empathetic',
  'Engaging',
  'Persuasive'
]

const webLanguages = [
  'Nederlands',
  'English',
  'Español',
  'Français',
  'Deutsch',
  'Italiano',
  '日本語',
  'Polski',
  'Português',
  'Русский',
  'Svenska',
  'Türkçe',
  '中文'
];

const outlineLanguages = [
  'English',
  'Spanish',
  'French',
  'Chinese (simplified)',
  'German',
  'Afrikaans',
  'Albanian',
  'Arabic',
  'Bengali',
  'Bulgarian',
  'Chinese (traditional)',
  'Croatian',
  'Czech',
  'Danish',
  'Dutch',
  'Estonian',
  'Farsi',
  'Finnish',
  'Greek',
  'Gujarati',
  'Hebrew',
  'Hindi',
  'Hungarian',
  'Indonesian',
  'Italian',
  'Japanese',
  'Kannada',
  'Korean',
  'Latvian',
  'Lithuanian',
  'Macedonian',
  'Malayalam',
  'Marathi',
  'Nepali',
  'Norwegian',
  'Panjabi',
  'Polish',
  'Portuguese',
  'Romanian',
  'Russian',
  'Slovak',
  'Slovenian',
  'Somali',
  'Swahili',
  'Swedish',
  'Tagalog',
  'Tamil',
  'Telugu',
  'Thai',
  'Turkish',
  'Ukrainian',
  'Urdu',
  'Vietnamese'
];

const selectorsToOptionsMap = {
  'sectionSelector': sections,
  'toneSelector': tones,
  'webLanguageSelector': webLanguages,
  'outlineLanguageSelector': outlineLanguages,
}

function initLiElements(selectorId, list, shouldRender = true) {
  const ulElement = document.querySelector(`#${selectorId} ul`);
  list.forEach((item) => {
    const styles = ['w-full', 'py-1.5', 'px-3', 'hover:bg-gray-300/30', 'block', 'cursor-pointer'];
    const liElement = document.createElement('li');
    liElement.textContent = item;
    styles.forEach((style) => liElement.classList.add(style));
    ulElement.appendChild(liElement);
  });
  const liElements = [...ulElement.childNodes].filter((node) => {
    return node.nodeType === Node.ELEMENT_NODE && node.tagName.toLowerCase() === 'li'
  });
  return liElements;
};

function initSelectors(selectorIds) {
  selectorIds.forEach((selectorId) => {
    // Get tag and list options
    const spanElement = document.querySelector(`#${selectorId} summary span`);
    // const liElements = document.querySelectorAll(`#${selectorId} ul li`);
    const liElements = initLiElements(selectorId, selectorsToOptionsMap[selectorId]);
    // Set the default options
    if ([...liElements].length === 0) {
      return;
    }
    const defaultLi = [...liElements].find((li) => li.textContent.toLowerCase() === spanElement.textContent.toLowerCase())
    ACTIVE_STYLE.forEach(style => defaultLi.classList.add(style));
    // Listen for selection events
    handleSelectionChange(liElements, spanElement);
  });
};

function handleSelectionChange(liElements, labelElement) {
  function removeActiveStyles() {
    liElements.forEach((li) => {
      ACTIVE_STYLE.forEach(style => li.classList.remove(style));
    });
  }
  liElements.forEach((li) => {
    li.addEventListener('click', function () {
      removeActiveStyles();
      ACTIVE_STYLE.forEach((style) => {
        li.classList.add(style);
      });
      labelElement.textContent = this.textContent;
      this.closest('details').open = false;
    });
  });
};

const selectorIds = ['sectionSelector', 'toneSelector', 'webLanguageSelector', 'outlineLanguageSelector'];
initSelectors(selectorIds);

function handleSearch() {
  const selectorId = 'outlineLanguageSelector';
  const languageList = document.querySelectorAll(`#${selectorId} ul li`);

  const filterText = this.value.toLowerCase();
  languageList.forEach(function (item) {
    const itemText = item.textContent.toLowerCase();
    if (itemText.includes(filterText)) {
      item.classList.remove('hidden');
    } else {
      item.classList.add('hidden');
    }
  });
};

async function handleCopyClick() {
  const content = document.querySelector('#content');
  const textToCopy = content.textContent;
  if (!navigator.clipboard) {
    console.warn('Clipboard API not supported');
    return;
  };
  try {
    await navigator.clipboard.writeText(textToCopy);
    alert('复制成功！');
  } catch (err) {
    console.error('复制失败:', err);
  }
};

function downloadTextFile() {
  const content = document.querySelector('#content');
  const textToCopy = content.textContent;

  const blob = new Blob([textToCopy], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'index.txt';

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

document.addEventListener('DOMContentLoaded', function () {
  const languageSearch = document.querySelector('#languageSearch');
  languageSearch.addEventListener('input', handleSearch);

  const copyBtn = document.querySelector('#copy');
  copyBtn.addEventListener('click', handleCopyClick);

  const exportBtn = document.querySelector('#export');
  exportBtn.addEventListener('click', downloadTextFile);
});

document.addEventListener('click', function (event) {
  const detailsElements = document.querySelectorAll('details[open]');

  let isClickInsideDetails = false;
  for (let details of detailsElements) {
    if (details.contains(event.target)) {
      isClickInsideDetails = true;
      break;
    }
  }
  if (!isClickInsideDetails) {
    detailsElements.forEach(details => {
      details.open = false;
    });
  }
}, true);

function getFormValues() {
  const form = document.getElementById('blogPostForm');
  const blogTopic = document.getElementById('blogTopicInput').value;
  const contentPoints = document.getElementById('contentPointsInput').value;

  // 打印或使用这些值
  console.log('Blog Topic:', blogTopic);
  console.log('Content Points:', contentPoints);
};
