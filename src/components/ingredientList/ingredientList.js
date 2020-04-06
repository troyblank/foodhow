import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Ingredient from '../ingredient/ingredient';

export class IngredientListComponent extends PureComponent {
    render() {
        const { shoppingList, dispatch, title, ingredients, fileName } = this.props;

        return (
          <React.Fragment>
            { title && <h3 className={'ingredient__title'}>{title}</h3> }
            <ul>
              { ingredients.map((i) => (
                <Ingredient
                  fileName={fileName}
                  text={i}
                  shoppingList={shoppingList}
                  dispatch={dispatch}
                  key={i}
                />
            ))}
            </ul>
          </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    shoppingList: state.shoppingListStore.shoppingList
});

export default connect(mapStateToProps)(IngredientListComponent);
