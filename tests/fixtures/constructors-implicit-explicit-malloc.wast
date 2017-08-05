 (export "test" (func $test))
 (export "memory" (memory $0))
 (func $TestImplicit (type $ii) (param $0 i32) (result i32)
  (return
   (get_local $0)
  )
 )
 (func $TestExplicit (type $ii) (param $0 i32) (result i32)
  (local $1 i32)
  (set_local $1
   (call $assembly.d.ts/malloc
    (i32.const 1)
   )
  )
  (return
   (get_local $1)
  )
 )
 (func $test (type $v)
  (local $0 i32)
  (local $1 i32)
  (set_local $0
   (call $TestImplicit
    (call $assembly.d.ts/malloc
     (i32.const 0)
    )
   )
  )
  (set_local $1
   (call $TestExplicit
    (i32.const 0)
   )
  )
 )
