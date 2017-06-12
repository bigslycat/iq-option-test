/* @flow */

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';

// $FlowFixMe
import './styles.styl';

import configureStore from './configure-store';
import gistUrlFormat from './helpers/gist-url-format';
import loadCountriesAction from './actions/load-countries-action';

import DropDown from './containers/drop-down';

const store = configureStore();

const gistUrl = gistUrlFormat({
  user: 'bigslycat',
  gistId: '113a3bd2d7e35eaccd34378ca16fa86e',
  revision: '189a5fa692bfa6cb65a1bfb298c25ba20864bd2f',
  filename: 'countries.json',
});

store.dispatch(loadCountriesAction(gistUrl));

const load = () => render((
  <AppContainer>
    <Provider store={store}>
      <main className="main">
        {!(DropDown: any).isTouch() && (
          <div className="main__text">
            <p className="main__paragraph">
              Если что, здесь есть вертикальная прокрутка,
              можно затестить смену положения автокомплита. 👉
            </p>
          </div>
        )}

        <DropDown label="Выберите страну" />

        <div className="main__text">
          <p className="main__paragraph">
            Если честно, я вообще не понял, почему не
            <code className="main__code">css-modules</code>.
            Но, раз БЭМ, значит БЭМ. Тем не менее, файлы к бандлу я подключил всё равно
            самым удобным способом, с помощью лоадера.
          </p>
          <p className="main__paragraph">
            То, что модификаторы лежат не в отдельных файлах, тоже сделано сознательно —
            я решил до конца не следовать БЭМу в плане иерархии файловой системы, т.к.
            счёл, что ТЗ не ограничивает меня этим требованием (БЭМ только в вёрстке).
          </p>
          <p className="main__paragraph">
            Я использовал Flow просто потому, что мне так удобнее — мне почти не пришлось
            отлаживать компонент. На аннотации типов можно просто не обращать внимания —
            если их убрать, останется обычный ES6+.
          </p>
          <p className="main__paragraph">
            P.S.: Код лежит&nbsp;
            <a className="main__link" href="https://github.com/bigslycat/iq-option-test">здесь</a>.
            Данные прилетают вот <a className="main__link" href={gistUrl}>отсюда</a>.
            А Stylus, да, как оказалось, крутая штука.
          </p>
        </div>
      </main>
    </Provider>
  </AppContainer>
), document.getElementById('app'));

if (
  module.hot &&
  typeof module.hot.accept === 'function'
) module.hot.accept('./containers/drop-down', load);

load();
