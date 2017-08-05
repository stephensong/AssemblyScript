 (export "test" (func $test))
 (export "memory" (memory $0))
 (func $B (type $ii) (param $0 i32) (result i32)
  (i32.store
   (get_local $0)
   (i32.const 1)
  )
  (i32.store offset=4
   (get_local $0)
   (i32.add
    (i32.load
     (get_local $0)
    )
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
    (call $assembly.d.ts/memset
     (call $assembly.d.ts/malloc
      (i32.const 8)
     )
     (i32.const 0)
     (i32.const 8)
    )
   )
  )
 )
