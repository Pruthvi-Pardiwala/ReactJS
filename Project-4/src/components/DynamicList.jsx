import { useId } from 'react'

export default function DynamicList({
  label,
  items,
  onChange,
  addLabel = 'Add row',
  emptyItemPlaceholder = 'Type here...',
  minItems = 1,
  errors = [],
  onBlurItem,
  onFocusItem,
}) {
  const baseId = useId()

  const canRemove = items.length > minItems

  return (
    <div className="field">
      <div className="field__labelRow">
        <label className="label">{label}</label>
        <button
          type="button"
          className="btn btn--secondary btn--sm"
          onClick={() => onChange([...items, ''])}
        >
          {addLabel}
        </button>
      </div>

      <div className="dynamicList" role="group" aria-label={label}>
        {items.map((value, idx) => {
          const inputId = `${baseId}-${idx}`
          const err = errors[idx]
          return (
            <div className="dynamicRow" key={inputId}>
              <input
                id={inputId}
                className={`input ${err ? 'input--error' : ''}`}
                type="text"
                value={value}
                placeholder={emptyItemPlaceholder}
                onChange={(e) => {
                  const next = [...items]
                  next[idx] = e.target.value
                  onChange(next)
                }}
                onBlur={() => onBlurItem?.(idx)}
                onFocus={() => onFocusItem?.(idx)}
                aria-invalid={err ? 'true' : 'false'}
                aria-describedby={err ? `${inputId}-err` : undefined}
              />

              <button
                type="button"
                className="btn btn--danger btn--sm"
                onClick={() => onChange(items.filter((_, i) => i !== idx))}
                disabled={!canRemove}
                aria-disabled={!canRemove}
                title={canRemove ? 'Remove row' : `At least ${minItems} row required`}
              >
                Remove
              </button>

              {err ? (
                <div id={`${inputId}-err`} className="errorText">
                  {err}
                </div>
              ) : null}
            </div>
          )
        })}
      </div>
    </div>
  )
}

