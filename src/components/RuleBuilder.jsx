import { useState } from 'react';
import { Rule, RuleCondition, RuleAction } from '../models/pricing/Rule';
import './RuleBuilder.css';

const RuleBuilder = () => {
  const [ruleName, setRuleName] = useState('');
  const [ruleDescription, setRuleDescription] = useState('');
  const [conditions, setConditions] = useState([]);
  const [actions, setActions] = useState([]);
  const [selectedTarget, setSelectedTarget] = useState('');
  const [selectedOperator, setSelectedOperator] = useState('');
  const [conditionValue, setConditionValue] = useState('');
  const [selectedActionType, setSelectedActionType] = useState('');
  const [actionValue, setActionValue] = useState('');

  const targets = [
    { value: 'category', label: 'Category' },
    { value: 'publicationCount', label: 'Publication Count' },
    { value: 'addOns', label: 'Add-Ons' },
    { value: 'client', label: 'Client' },
    { value: 'date', label: 'Date' }
  ];

  const operators = {
    category: [
      { value: 'equals', label: 'Equals' },
      { value: 'notEquals', label: 'Not Equals' },
      { value: 'in', label: 'In List' }
    ],
    publicationCount: [
      { value: 'greaterThan', label: 'Greater Than' },
      { value: 'lessThan', label: 'Less Than' },
      { value: 'equals', label: 'Equals' }
    ],
    addOns: [
      { value: 'contains', label: 'Contains' },
      { value: 'notContains', label: 'Does Not Contain' },
      { value: 'all', label: 'Contains All' }
    ],
    client: [
      { value: 'equals', label: 'Equals' },
      { value: 'notEquals', label: 'Not Equals' }
    ],
    date: [
      { value: 'dateInRange', label: 'In Range' },
      { value: 'before', label: 'Before' },
      { value: 'after', label: 'After' }
    ]
  };

  const actionTypes = [
    { value: 'overridePrice', label: 'Override Price' },
    { value: 'applyDiscount', label: 'Apply Discount' },
    { value: 'addFreeAddOn', label: 'Add Free Add-On' },
    { value: 'removeAddOn', label: 'Remove Add-On' },
    { value: 'setPublicationCount', label: 'Set Publication Count' }
  ];

  const addCondition = () => {
    if (!selectedTarget || !selectedOperator || !conditionValue) return;

    const newCondition = new RuleCondition({
      target: selectedTarget,
      operator: selectedOperator,
      value: conditionValue
    });

    setConditions([...conditions, newCondition]);
    setSelectedTarget('');
    setSelectedOperator('');
    setConditionValue('');
  };

  const addAction = () => {
    if (!selectedActionType || !actionValue) return;

    const newAction = new RuleAction({
      type: selectedActionType,
      value: actionValue
    });

    setActions([...actions, newAction]);
    setSelectedActionType('');
    setActionValue('');
  };

  const removeCondition = (index) => {
    setConditions(conditions.filter((_, i) => i !== index));
  };

  const removeAction = (index) => {
    setActions(actions.filter((_, i) => i !== index));
  };

  const saveRule = () => {
    if (!ruleName || conditions.length === 0 || actions.length === 0) return;

    const rule = new Rule({
      name: ruleName,
      description: ruleDescription,
      conditions,
      actions,
      priority: 0
    });

    // Here you would typically save the rule to your backend
    console.log('Saving rule:', rule.toJSON());
  };

  return (
    <div className="rule-builder">
      <div className="rule-header">
        <h2>Rule Builder</h2>
        <div className="rule-info">
          <input
            type="text"
            placeholder="Rule Name"
            value={ruleName}
            onChange={(e) => setRuleName(e.target.value)}
          />
          <textarea
            placeholder="Rule Description"
            value={ruleDescription}
            onChange={(e) => setRuleDescription(e.target.value)}
          />
        </div>
      </div>

      <div className="conditions-section">
        <h3>Conditions</h3>
        <div className="condition-builder">
          <select
            value={selectedTarget}
            onChange={(e) => setSelectedTarget(e.target.value)}
          >
            <option value="">Select Target</option>
            {targets.map(target => (
              <option key={target.value} value={target.value}>
                {target.label}
              </option>
            ))}
          </select>

          {selectedTarget && (
            <select
              value={selectedOperator}
              onChange={(e) => setSelectedOperator(e.target.value)}
            >
              <option value="">Select Operator</option>
              {operators[selectedTarget]?.map(op => (
                <option key={op.value} value={op.value}>
                  {op.label}
                </option>
              ))}
            </select>
          )}

          {selectedTarget && selectedOperator && (
            <input
              type="text"
              placeholder="Value"
              value={conditionValue}
              onChange={(e) => setConditionValue(e.target.value)}
            />
          )}

          <button onClick={addCondition}>Add Condition</button>
        </div>

        <div className="conditions-list">
          {conditions.map((condition, index) => (
            <div key={index} className="condition-item">
              <span>
                {condition.target} {condition.operator} {condition.value}
              </span>
              <button onClick={() => removeCondition(index)}>Remove</button>
            </div>
          ))}
        </div>
      </div>

      <div className="actions-section">
        <h3>Actions</h3>
        <div className="action-builder">
          <select
            value={selectedActionType}
            onChange={(e) => setSelectedActionType(e.target.value)}
          >
            <option value="">Select Action</option>
            {actionTypes.map(action => (
              <option key={action.value} value={action.value}>
                {action.label}
              </option>
            ))}
          </select>

          {selectedActionType && (
            <input
              type="text"
              placeholder="Value"
              value={actionValue}
              onChange={(e) => setActionValue(e.target.value)}
            />
          )}

          <button onClick={addAction}>Add Action</button>
        </div>

        <div className="actions-list">
          {actions.map((action, index) => (
            <div key={index} className="action-item">
              <span>
                {action.type}: {action.value}
              </span>
              <button onClick={() => removeAction(index)}>Remove</button>
            </div>
          ))}
        </div>
      </div>

      <button className="save-button" onClick={saveRule}>
        Save Rule
      </button>
    </div>
  );
};

export default RuleBuilder; 