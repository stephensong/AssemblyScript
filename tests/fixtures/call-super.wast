 (export "test" (func $test))
 (export "memory" (memory $0))
 (func $A (type $iiii) (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (return
   (get_local $0)
  )
 )
 (func $B (type $ii) (param $0 i32) (result i32)
  (drop
   (call $A
    (get_local $0)
    (i32.const 1)
    (i32.const 2)
   )
  )
  (return
   (get_local $0)
  )
 )
 (func $test (type $v)
  (local $0 i32)
  (set_local $0
   (call $B
    (call $assembly.d.ts/malloc
     (i32.const 0)
    )
   )
  )
 )
