import { Select, SelectProps } from 'antd';
import { useEffect, useState } from 'react';
import { inputSearch, isEmpty, isEmptyArray } from '../utils/utils';

type OptionType = { label: string; value: string };
type ValueType = string | string[];

type EditableSelectProps = {
  onAddOption?: (option: OptionType) => void;
  onOptionsChange?: (options: OptionType[]) => void;
  options: OptionType[];
  mannualInput?: boolean;
} & Omit<SelectProps<ValueType>, 'options' | 'onAddOption'>;

const SelectWrapper = ({
  onAddOption,
  options,
  value,
  mannualInput,
  mode,
  onChange,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onOptionsChange,
  ...otherProps
}: EditableSelectProps) => {
  const [searchVal, setSearchVal] = useState('');

  return (
    <Select
      {...otherProps}
      options={options}
      value={value}
      showSearch
      mode={mode}
      onChange={(newValue, newOption) => {
        if (newValue != null) {
          onChange?.(newValue, newOption);
        }
      }}
      filterOption={(input, option) => inputSearch(input, `${option?.label || ''}` || `${option?.value || ''}`)}
      onInputKeyDown={(event) => {
        if (event.key === 'Enter') {
          const addVal = searchVal?.trim();
          if (!isEmpty(addVal)) {
            onAddOption?.({
              label: addVal,
              value: addVal,
            });
          }
        }
      }}
      onSearch={(val) => {
        setSearchVal(val);
      }}
      // eslint-disable-next-line react/no-unstable-nested-components
      dropdownRender={(menu) => {
        if (!mannualInput) {
          return menu;
        }

        const found = options?.filter(({ label }) => isEmpty(searchVal) || inputSearch(searchVal, label));
        if (isEmptyArray(found)) {
          return (
            <div>
              <div style={{ marginLeft: '10px' }}>Type Enter key to add</div>
            </div>
          );
        }

        return menu;
      }}
    />
  );
};

export const EditableSelect = (props: EditableSelectProps) => {
  const { options, value, mannualInput, mode, onAddOption, onChange, onOptionsChange, ...otherProps } = props;

  const [internalValue, setInternalValue] = useState<ValueType | undefined>('');
  const [internalOptions, setInternalOptions] = useState<OptionType[]>(options);
  const isMultiple = ['multiple', 'tags'].includes(mode || '');
  const [key, setKey] = useState(0);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  useEffect(() => {
    setInternalOptions(options);
  }, [options]);

  return (
    <div key={key}>
      <SelectWrapper
        {...otherProps}
        options={internalOptions}
        value={isMultiple ? internalValue || [] : internalValue}
        mode={mode}
        mannualInput={mannualInput}
        onAddOption={(newOption: OptionType) => {
          if (mannualInput) {
            const exists = options?.find(({ value: v }) => v === newOption.value);

            // only change the value
            if (exists) {
              const newValue = isMultiple ? [...new Set([...(internalValue || []), newOption.label])] : newOption.label;
              setInternalValue(newValue);
            } else {
              const newOptionList = [...internalOptions, newOption];
              setInternalOptions(newOptionList);
              const newValue = isMultiple ? [...(internalValue || []), newOption.label] : newOption.label;
              setInternalValue(newValue);
              onAddOption?.(newOption);
            }

            // re-mount when add option
            setKey(key + 1);
          }
        }}
        onChange={(newValue, newOption) => {
          setInternalValue(newValue);
          onChange?.(newValue, newOption);
        }}
        onOptionsChange={(newOptions: OptionType[]) => {
          setInternalOptions(newOptions);
          onOptionsChange?.(newOptions);
        }}
      />
    </div>
  );
};
