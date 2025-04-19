'use client';
import { useState } from 'react';
import styles from './VariablesTable.module.scss';
import { useVariablesStore } from '@/Store/variablesStore';
import { useTranslations } from 'next-intl';

interface Variable {
  id: string;
  name: string;
  value: string;
}

export default function VariablesTable() {
  const { variables, addVariable, updateVariable, deleteVariable } =
    useVariablesStore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingVariable, setEditingVariable] = useState<Variable | null>(null);
  const [newVariable, setNewVariable] = useState<Omit<Variable, 'id'>>({
    name: '',
    value: '',
  });
  const t = useTranslations('Variables');

  const handleAdd = () => {
    setEditingVariable(null);
    setNewVariable({ name: '', value: '' });
    setIsModalVisible(true);
  };

  const handleEdit = (record: Variable) => {
    setEditingVariable(record);
    setNewVariable({ name: record.name, value: record.value });
    setIsModalVisible(true);
  };

  const handleDelete = (id: string) => {
    deleteVariable(id);
  };

  const handleSave = () => {
    if (editingVariable) {
      updateVariable(editingVariable.id, newVariable);
    } else {
      addVariable(newVariable);
    }
    setIsModalVisible(false);
  };

  return (
    <div className={styles.container}>
      <button className={styles.addButton} onClick={handleAdd}>
        {t('add')}
      </button>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>{t('name')}</th>
            <th>{t('value')}</th>
            <th>{t('actions')}</th>
          </tr>
        </thead>
        <tbody>
          {variables.map((variable) => (
            <tr key={variable.id}>
              <td>{variable.name}</td>
              <td>{variable.value}</td>
              <td>
                <div className={styles.actions}>
                  <button
                    className={styles.editButton}
                    onClick={() => handleEdit(variable)}
                  >
                    {t('edit')}
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(variable.id)}
                  >
                    {t('delete')}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalVisible && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>{editingVariable ? t('edit-var') : t('edit-add')}</h2>
            <div className={styles.inputGroup}>
              <label htmlFor="name">{t('var-name')}</label>
              <input
                id="name"
                type="text"
                value={newVariable.name}
                onChange={(e) =>
                  setNewVariable({ ...newVariable, name: e.target.value })
                }
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="value">{t('var-val')}</label>
              <input
                id="value"
                type="text"
                value={newVariable.value}
                onChange={(e) =>
                  setNewVariable({ ...newVariable, value: e.target.value })
                }
              />
            </div>
            <div className={styles.modalActions}>
              <button
                className={styles.cancelButton}
                onClick={() => setIsModalVisible(false)}
              >
                {t('cancel')}
              </button>
              <button className={styles.saveButton} onClick={handleSave}>
                {t('save')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
